/*var Ordocument = require('./models/OrDocuments');*/
var path = require('path');
var fs = require('fs');
var multer = require('multer');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.post('/search', function (req,res) {
		// body...

		var searchMap = req.body;
		//console.log(searchMap);
		var startDate, endDate = null;
		var aliases,filename, exchangeName, exchangeDistance = null;
		var searchQuery = {};

		//validating against the parameters
		for(var key in searchMap){
			if(key == 'startDate')
				 startDate = searchMap[key];
			if(key == 'endDate')
				 endDate = searchMap[key];
			if(key == 'aliases')
				 aliases = searchMap[key];
			if(key == 'filename')
				 filename = searchMap[key];
			if(key == 'exchangeName')
				 exchangeName = searchMap[key];
			if(key == 'exchangeDistance')
				exchangeDistance = searchMap[key];
		}

		if(startDate && endDate && aliases && filename && exchangeName && exchangeDistance != null)
			searchQuery = {'filename':filename, 'aliases':aliases, 'exchangeName':exchangeName,'exchangeDistance':exchangeDistance,'uploadDate':{
			'$gte': new Date(startDate),
			'$lte':new Date(endDate)

		}};
		else if(startDate && endDate != null)
			searchQuery = {'uploadDate':{
			'$gte': new Date(startDate),
			'$lte':new Date(endDate)

		}};
		else if(startDate  != null)
			searchQuery = {'uploadDate':{
			'$gte': new Date(startDate)
		

		}};
		else if(endDate != null)
			searchQuery = {'uploadDate':{
			 '$lte':new Date(endDate)

		}};
		
		else if(aliases != null && filename != null)
			searchQuery = {'filename':filename,'aliases':aliases};

		else if(aliases != null)
			searchQuery = {'aliases' :aliases};

		else if(filename != null)
			searchQuery = {'filename':filename};

		else if(exchangeName != null && exchangeDistance != null)
			searchQuery = {'metadata.exchange_name':exchangeName,'metadata.exchange_distance':exchangeDistance};
		
		else if(exchangeName != null)
			searchQuery = {'metadata.exchange_name':exchangeName};

		else if(exchangeDistance != null)
			searchQuery = {'metadata.exchange_distance':exchangeDistance};

		else
			console.error("wrong inputs");
		
		console.log(searchQuery);

		gfs.files.find(searchQuery).toArray(function (err, files) {
			if(err)
				console.error(err);

			if(files.length===0){
		        return res.status(400).send({
		            message: 'File not found'
		        });
		    }
		    var done =0;
		   
		    files.forEach(function(file,i){
		    var readstream = gfs.createReadStream({
			    filename: file.filename
			          		
				});
		    var bufs= [];
		   
		    readstream.on('data', function(chunk) {
		    	
		    	bufs.push(chunk);
		    	var fbuf = Buffer.concat(bufs);
   				var base64 = (fbuf.toString('base64'));
  				file['image_url']= base64;	
  				 
		    });

		    readstream.on('end', function() {
		    	
		    	if(++done ==files.length)
		    	{
		    		console.log(files);
		   	    	res.end(JSON.stringify(files));
		    	}
	  
  				
   				
		    });	

		    });
		    
		    
		

	});
});
	app.post('/upload',multer({dest: './uploads/'}).single('file'), function(req,res){

		console.log(req.file);
		var file = req.file;
		var aliases = null;
		var exchangeName= null;
		var exchangeDistance = null;

		var formData = req.body['formData'];
		console.log(formData);

		//adding custom fields to metadata
		if(formData['exchangeName'])
			exchangeName = formData['exchangeName'];
		if(formData['exchangeDistance'])
			exchangeDistance = formData['exchangeDistance'];
		if(formData['aliases'])
			 aliases = formData['aliases'];
		
	
	    var writestream = gfs.createWriteStream({filename:file['originalname'], aliases:aliases, metadata:{exchange_name:exchangeName,exchange_distance:exchangeDistance}});
	    // open a stream to the temporary file created by Express...
	    fs.createReadStream( file['path'])
	      .on('end', function() {
	      	console.log("successfully uploaded");
	        res.send('OK');
	      })
	      .on('error', function() {
	      	console.log("err");
	        res.send('ERR');
	      })
	      // and pipe it to gfs
	      .pipe(writestream);

	});
	
};