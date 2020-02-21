import gql from "graphql-tag";

export const MOVE_ZOMBIES = gql`
    mutation moveZombies($from: String!, $to: String!, $amount: Int!) {
        moveZombies(from: $from, to: $to, amount: $amount) {
            _id
            name
            zombiesCount
        }
    }
`;
