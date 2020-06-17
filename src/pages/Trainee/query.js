import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query getAllTrainee($limit: Int, $skip: Int) {
  getAllTrainee(options: { limit: $limit, skip: $skip }) {
    count
    records{
    _id
    originalId
    name
    email
    role
    createdAt
    }
  }
}
`;

export { GET_TRAINEE };
