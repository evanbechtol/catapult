const { baseURL, authKey } = require( "../config" );
const request = require( "supertest" );
const { removeDictionary } = require( "./requestUtil" );
const endpoint = "/dictionary";
let dictionaryId;

// Remove the dictionary that was created after all tests are run
afterAll( done => {
  removeDictionary( endpoint, dictionaryId )
    .then( () => {
      console.info( "Dictionary delete successful" );
      done();
    } )
    .catch( err => {
      console.error( err );
      done();
    } );
} );

describe( "Create /dictionary", () => {

  // The Authorization header is required, not providing it should result in a
  // 401
  it( "Should return 401 without Authorization header", done => {
    request( baseURL )
      .post( endpoint )
      .set( "Accept", "application/json" )
      .expect( 401 )
      .end( ( err, res ) => {
        if ( err ) {
          return done( err );
        }

        expect( res.body ).toEqual( {} );
        done();
      } );
  } );

  // The Authorization header is required, not providing a valid key should
  // result in a 401
  it( "Should return 401 with invalid Authorization token", done => {
    request( baseURL )
      .post( endpoint )
      .set( "Accept", "application/json" )
      .set( "Authorization", "Basic someInvalidAuthKey" )
      .expect( 401 )
      .end( ( err, res ) => {
        if ( err ) {
          return done( err );
        }

        done();
      } );
  } );

  // When providing a valid authorization token, a valid dictionary id should
  // be returned
  it( "Should return a dictionary id", done => {
    request( baseURL )
      .post( endpoint )
      .set( "Accept", "application/json" )
      .set( "Authorization", authKey )
      .expect( "Content-Type", "application/json" )
      .expect( 201 )
      .end( ( err, res ) => {
        if ( err ) {
          return done( err );
        }

        expect( res.body ).toHaveProperty( "id" );

        // Set the dictionaryId so that we can remove it when tests are complete
        dictionaryId = res.body.id;
        done();
      } );
  } );
} );
