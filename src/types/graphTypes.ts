import { buildSchema } from 'graphql'
export const schema = buildSchema(`
  type Ticket {
    Section: String
    SeatNumber: String
    Zone: String
    SeatRow: String
    Price: Int
  }


  type Query {
    getTickets: [Ticket]
    getTicketsByZone(ZoneId: Int): [Ticket]
  }

`)
