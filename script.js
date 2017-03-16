window.onload = function() {
	let op = document.getElementById("output");
	let op2 = document.getElementById("output2");
	let key = document.getElementById("getkeyButton");
	let inputTitle = document.getElementById("title");
	let inputAuthor = document.getElementById("author");
	let addbtn = document.getElementById("addbutton");
	let error = document.getElementById("errormessage");
	let viewBooks = document.getElementById("viewBooks");
	let booklist = document.getElementById("booklist");
	let listofbooks = document.getElementById("listofbooks");
	var bookIdnr = document.getElementById("id");
	
    
    /*****view books*****/
	let loadagain = function() {
		let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=8FFpG";
		let req = new XMLHttpRequest();
		console.log('loadagain före ajax, url=', url);
		req.onreadystatechange = function(event) {
			//console.log("readyState:" + req.readyState);
			if (req.status == 200 && req.readyState == 4) {
				var data = JSON.parse(req.responseText);
				//console.log(data);
				//console.log(req.responseText); 
				if (data.status === "error") {
					console.log('loadagain error: ', data, url);
					loadagain();
				} else {
					listofbooks.innerHTML = "";
					for (let i = 0; i < data.data.length; i++) {
						let item = document.createElement("li");
						item.innerHTML = "<span>Id:</span> " + data.data[i].id + ", <span>Title:</span> " + data.data[i].title + ", <span>Author:</span> " + data.data[i].author;
						listofbooks.appendChild(item);
					};
				}
			}
		};
		req.open("GET", url);
		req.send();
	};
	viewBooks.addEventListener("click", loadagain);
	
    
    
    /*****  delete book *****/
	let deletebooks = function() {
		let deleteId = bookIdnr.value;
		let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=8FFpG&id=" + deleteId;
		let req = new XMLHttpRequest();
		req.onreadystatechange = function(event) {
			console.log("delete readyState:" + req.readyState);
			if (req.status == 200 && req.readyState == 4) {
				var data = JSON.parse(req.responseText);
				console.log('delete data: ', data);
				console.log('delete responsetext: ', req.responseText);
				if (data.status === "error") {
					deletebooks();
				} else loadagain();
			}
		};
		req.open("post", url);
		req.send();
		bookIdnr.value = "";
	};
	deletebutton.addEventListener("click", deletebooks);
	
    
    
    /*****add books*****/
	let pushBook = function() {
		let pushAuthor = inputAuthor.value;
		let pushTitle = inputTitle.value;
		let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=8FFpG&title=" + pushTitle + "&author=" + pushAuthor;
		console.log('pushbook url: ', url);
		let req = new XMLHttpRequest();
		req.onreadystatechange = function(event) {
			//  console.log("readyState:" + req.readyState);
			if (req.status == 200 && req.readyState == 4) {
				var data = JSON.parse(req.responseText);
				// console.log('pushbook success', data);
				// console.log("pushbook responsetext", req.responseText);
				if (data.status === "error") {
					//console.log("försöker med insert igen");   
					pushBook();
				} else {
					inputAuthor.value = "";
					inputTitle.value = "";
				};
			}
		};
		req.open("post", url);
		req.send();
	};
	addbtn.addEventListener("click", pushBook);
	
    
    /****** get key ******/
	key.addEventListener("click", function(event) {
		op.innerHTML = "8FFpG";
	});
};