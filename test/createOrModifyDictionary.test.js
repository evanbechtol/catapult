const { baseURL, authKey } = require( "../config" );
const request = require( "supertest" );
const { createDictionary, getValueForKey, randomNumber, removeDictionary } = require( "./requestUtil" );
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

// Delete the dictionary that was created after all tests are done
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

describe( "Create or Modify /dictionary", () => {
  it( "Should return 200 with valid Id, Key, and Body", done => {
    // Generate a new value each time to verify that the key-value pair is
    // actually being updated
    const body = { "value": randomNumber() };
    const key = "test";
    const uri = `${endpoint}/${dictionaryId}/keys/${key}`;
    const qs = { id: dictionaryId, key: "test" };

    request( baseURL )
      .post( uri )
      .query( qs )
      .send( body )
      .set( "Accept", "application/json" )
      .set( "Authorization", authKey )
      .expect( 200 )
      .end( ( err, res ) => {
        if ( err ) {
          return done( err );
        }

        getValueForKey( endpoint, dictionaryId, key )
          .then( result => {
            expect( result ).toHaveProperty( "value" );
            expect( result.value ).toEqual( body.value );
            done();
          } )
          .catch( err => {
            console.error( err );
            done();
          } );
      } );
  } );
} );
