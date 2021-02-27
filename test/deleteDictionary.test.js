const { baseURL, authKey } = require( "../config" );
const request = require( "supertest" );
const { createDictionary } = require( "./requestUtil" );
const endpoint = "/dictionary";
let dictionaryId;

// Create a dictionary before tests run
beforeAll( done => {
  createDictionary( endpoint )
    .then( id => {
      dictionaryId = id;
      console.info( "Dictionary create successful" );
      done();
    } )
    .catch( err => {
      console.error( err );
      done();
    } );
} );

describe( "Delete /dictionary", () => {

  // An invalid ID should cause no adverse effects when passed to the API
  it( "Should return 404 when dictionary not found with Id", done => {
    const invalidId = "123123123";
    const uri = `${endpoint}/${invalidId}`;
    request( baseURL )
      .del( uri )
      .set( "Accept", "application/json" )
      .set( "Authorization", authKey )
      .expect( "Content-Type", "application/json" )
      .expect( 404 )
      .end( ( err, res ) => {
        if ( err ) {
          return done( err );
        }

        done();
      } );
  } );

  // When providing a valid authorization token, and a valid dictionary id, the
  // dictionary should be deleted
  it( "Should delete with a valid dictionary id", done => {
    const uri = `${endpoint}/${dictionaryId}`;
    const qs = { id: dictionaryId };
    request( baseURL )
      .del( uri )
      .query( qs )
      .set( "Accept", "application/json" )
      .set( "Authorization", authKey )
      .expect( 204 )
      .end( ( err, res ) => {
        if ( err ) {
          return done( err );
        }

        done();
      } );
  } );
} );
