import { gql } from '@apollo/client';

//Define a query to get a paginated list of characters with their images
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!){
    characters(page: $page){
      info{
        count
        pages
        next
        prev
        }
      results{
        id
        name
        image
        species
        status
        }
      }
    }`;

// Define a query to get detailed information about a specific character by ID
export const GET_CHARACTER_DETAIL = gql`
  query GetCharacterDetail($id: ID!){
    character(id:$id){
      id
      name
      status
      species
      type
      gender
      origin{
        name
        }
        location{
          name
          }
        image
        episode{
          id
          name
          episode
          }
        }
  }`;