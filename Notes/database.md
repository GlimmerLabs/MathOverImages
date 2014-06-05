users

	forename:VARCHAR
	surname:VARCHAR
	hashedPassword:VARCHAR
	email:VARCHAR
	email-visible: BOOLEAN
	pgp-public: VARCHAR // pretty good privacy
	username:VARCHAR
	type:VARCHAR	// Includes "unvalidated"
	signuptime: TIMESTAMP
	lastLogin: TIMESTAMP
	id:unsigned INT
	about: BLOB
	dob: TIMESTAMP	// Optional, but need to verify age.
	featuredImage: imageId
	
	Deleted
	  	pgp:VARCHAR // gender pronoun, may want multiple fields

relatedservices

	userid
	servicename
	serviceaccount
	servicedata
	
images

	ownerid: unsigned INT
	createdAt: TIMESTAMP
	modifiedAt: TIMESTAMP
	imageid: unsigned INT
	code: TEXT // The expression for generating the image
	codevisible: BOOLEAN // Warn users that there may be ways for clever folks to get code anyway
	format: VARCHAR
	rating: unsigned INT // Updated as rated.
	title: VARCHAR
	license: VARCHAR
	public: BOOLEAN // Vs access lists (will need experimentation with users)
	basedon: unsigned INT references images.imageid
	
	Deleted
		blurb: TEXT // Now the first comment.

  
comments

	postedBy:unsigned INT
	onImage: unsigned INT
	comment: TEXT
	commentId: unsigned INT
	commentNum: unsigned INT
	postedAt: TIMESTAMP
	active: BOOL
	
flaggedComments

	commentId
	analysis: VARCHAR
	active: BOOL
  
ratings

	userid: unsigned INT
	imageId: unsigned INT
	rating: INT // Probably 0/1 to start with
  
functions

	functionid: unsigned INT
	ownerid: unsigned INT
	functionname: VARCHAR
	data: TEXT
	description: BLOB
	// Question: How do we set up the database so that we can ask how a
	//   function is used.  One option, just search the image code.
	//   SELECT from IMAGES where code CONTAINS functionname 
	
functioncomments
	See above
	
imageChallenge	// How do you make this image?

	challengeid: unsigned INT
	name: VARCHAR
	code: TEXT
	narrative: TEXT // With HTML formatting?
	author: unsigned INT // users.userId
	targetLink: VARCHAR
	
functionChallenge // What image does this function describe?

albums

	userid:unsigned INT
	name:VARCHAR
	caption:TEXT
	albumId: unsigned INT
	publicity: unsigned INT
	dateCreated: TIMESTAMP
	dateModified: TIMESTAMP
	
albumContents

	albumId: unsigned INT
	imageId: unsigned INT

forum
	
	// Forthcoming.
	
badges

	// Forthcoming.
