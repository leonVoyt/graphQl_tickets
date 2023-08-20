import { ZoneQuary } from './../models/tickets.js'
import axios from 'axios'
import { Tickets } from '../models/tickets.js'

const fetchSeats = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const resolvers = {
  getTickets: async () => {
    let seats: Tickets[] = []
    let avaibleId: number = 0

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/ReferenceData/SeatStatuses'
    ).then((data) => {
      data.map((el: any) => {
        if (el.Description === 'Available') {
          return (avaibleId = el.Id)
        }
      })
    })

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/TXN/Packages/1195/Seats?constituentId=0&modeOfSaleId=26&packageId=1195'
    ).then((data) => {
      data.map((el: any) => {
        let seat: Tickets = {
          Section: 0,
          SeatNumber: '',
          Zone: '',
          SeatRow: '',
          Price: 0,
          ZoneId: 0,
        }
        if (el.SeatStatusId === avaibleId) {
          seat.SeatNumber = el.SeatNumber
          seat.SeatRow = el.SeatRow
          seat.Section = el.SectionId
          seat.Zone = el.ZoneId
          seat.ZoneId = el.ZoneId
          seat.Price = 0
          seats.push(seat)
        }
      })
    })

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/ReferenceData/Sections?seatMapId=12'
    ).then((data) => {
      data.map((sectEl: any) => {
        seats.map((seatEl: any) => {
          if (seatEl.Section === sectEl.Id) {
            seatEl.Section = sectEl.AdditionalText2
          }
        })
      })
    })

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/TXN/Packages/1195/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885'
    ).then((data) => {
      data.map((priceEl: any) => {
        if (priceEl.PerformanceId === 0) {
          seats.map((seatEl) => {
            if (seatEl.ZoneId === priceEl.ZoneId) {
              seatEl.Price = priceEl.Price
            }
          })
        }
      })
    })

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/TXN/Performances/ZoneAvailabilities?performanceIds=8444'
    ).then((data) => {
      data.map((zoneEl: any) => {
        seats.map((seatEl) => {
          if (seatEl.ZoneId === zoneEl.Zone.Description) {
            seatEl.Zone = zoneEl.Zone.Description
          }
        })
      })
    })

    return seats
  },
  getTicketsByZone: async (ZoneId: ZoneQuary) => {
    let seats: Tickets[] = []
    let avaibleId: number = 0

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/ReferenceData/SeatStatuses'
    ).then((data) => {
      data.map((el: any) => {
        if (el.Description === 'Available') {
          return (avaibleId = el.Id)
        }
      })
    })

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/TXN/Packages/1195/Seats?constituentId=0&modeOfSaleId=26&packageId=1195'
    ).then((data) => {
      data.map((el: any) => {
        let seat: Tickets = {
          Section: 0,
          SeatNumber: '',
          Zone: '',
          SeatRow: '',
          Price: 0,
          ZoneId: 0,
        }
        if (el.SeatStatusId === avaibleId) {
          seat.SeatNumber = el.SeatNumber
          seat.SeatRow = el.SeatRow
          seat.Section = el.SectionId
          seat.ZoneId = el.ZoneId
          seat.Price = 0

          seats.push(seat)
        }
      })
    })

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/ReferenceData/Sections?seatMapId=12'
    ).then((data) => {
      data.map((sectEl: any) => {
        seats.map((seatEl: any) => {
          if (seatEl.Section === sectEl.Id) {
            seatEl.Section = sectEl.AdditionalText2
          }
        })
      })
    })

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/TXN/Packages/1195/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885'
    ).then((data) => {
      data.map((priceEl: any) => {
        if (priceEl.PerformanceId === 0) {
          seats.map((seatEl) => {
            if (seatEl.ZoneId === priceEl.ZoneId) {
              seatEl.Price = priceEl.Price
            }
          })
        }
      })
    })

    await fetchSeats(
      'https://my.laphil.com/en/rest-proxy/TXN/Performances/ZoneAvailabilities?performanceIds=8444'
    ).then((data) => {
      data.map((zoneEl: any) => {
        seats.map((seatEl) => {
          if (seatEl.ZoneId === zoneEl.Zone.Description) {
            seatEl.Zone = zoneEl.Zone.Description
          }
        })
      })
    })

    return seats.filter((el) => {
      let copy: Tickets = Object.assign({}, el)
      if (copy.ZoneId === ZoneId.ZoneId) {
        return true
      }
      return false
    })
  },
}
