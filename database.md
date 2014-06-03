*users

	*forename:VARCHAR
	*surname:VARCHAR
	*hashedPassword:VARCHAR
	*email:VARCHAR
	*pgp:VARCHAR
	*username:VARCHAR
	*type:VARCHAR
	*signuptime: TIMESTAMP
	*id:unsigned INT
	*about: BLOB
  
*images

	*ownerid: unsigned INT
	*createdAt: TIMESTAMP
	*modifiedAt: TIMESTAMP
	*imageid: unsigned INT
	*data: BLOB
	*format: VARCHAR
	*rating: unsigned INT //recompiled daily? Or live from rating table?
	*caption: BLOB
	*license: VARCHAR
  
*comments

	*postedBy:unsigned INT
	*onImage: unsigned INT
	*comment: BLOB
	*commentId: unsigned INT
	*postedAt: TIMESTAMP
	*active: BOOL
  
*ratings

	*userid: unsigned INT
	*imageId: unsigned INT
  
*functions

	*functionid: unsigned INT
	*ownerid: unsigned INT
	*functionname: VARCHAR
	*data: BLOB
	*description: BLOB
  
*challenges

	*challengeid: unsigned INT
	*data: BLOB
	*targetLink: VARCHAR

*albums

	*userid:unsigned INT
	*albumId: unsigned INT
	*publicity: unsigned INT
	
*albumContents

	*albumId: unsigned INT
	*imageId: unsigned INT
