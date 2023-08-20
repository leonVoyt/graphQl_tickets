import { gql } from 'apollo-server-express'
export const typeDefs = gql`
  type Ticket {
    Section: String
    SeatNumber: String
    Zone: String
    SeatRow: String
    Price: Int
    ZoneId: Int
  }

  input ZoneQuary {
    ZoneId: Int
  }

  type Query {
    getTickets: [Ticket]
    getTicketsByZone(zoneQuary: ID!): [Ticket]
  }
`
