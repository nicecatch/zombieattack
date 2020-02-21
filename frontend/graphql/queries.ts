import gql from "graphql-tag";
import { IPlainLocation } from "../../generic/interfaces";

export interface ILocationResponse {
  getLocations: IPlainLocation[];
}

export const GET_LOCATIONS = gql`
    query getLocations {
        getLocations {
            _id
            name
            zombiesCount
        }
    }
`;
