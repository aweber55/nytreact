//server code

var axios = require("axios");
var cheerio = require("cheerio");


//Scraping
app.get("/scrape", function(req, res) {

    const websideScrape = "http://www.msnbc.com/topics/donald-trump"

    axios.get(websideScrape).then(function(response) {

          console.log(response.data);
          const $ = cheerio.load(response.data);

          var result = [];

          $('.teaser__title').each(function(index, element) {
                    
            result.push({
              title: $(this).children("a").text(),
              link: $(this).children("a").attr("href"),
              id: $(this).children("a").attr("vilynx-id")    
            });
          });
            res.json(result);
    });
});

//App code

function handleNewsScrape() {
  $('#articles').empty();
  $.getJSON("/scrape", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {

      if (data[i].link.substring(0, 4) != "http") {
        data[i].link = ("http://www.msnbc.com").concat(data[i].link.toString());
      };

      var thisId = data[i].title.trim().split(" ").join("_");

      // hide notes
      $('#noteText').empty();
      $('#notes').hide(400);
      $('#wrapper').show(400)

      if (screen.width > 800) {
        $('#wrapper').animate({ width: 680 }, 400);
      } else {
        $('#wrapper').animate({ width: '100%' }, 400);
      }

      // Display the apropos information on the page
      $("#articles").append(
        `<div id="videoDiv">
              <p>
                  <a class="videoNews" href=${data[i].link} target="SingleSecondaryWindowName" 
                  id="${thisId}" 
                  onclick="openRequestedSinglePopup(this.href); 
                  return false;">
                      ${data[i].title.trim()}
                  </a>
              </p>
          
                  <span class="button" id="saveVideo"> 
                      Save Video
                  </span>
              
                  <span class="button" id="addNotes"> 
                      Add Notes 
                  </span> 
              
                  <span class="button" id="viewNotes"> 
                      View Notes  
                  </span> 
          </div>`
      );
    };
  });
};
 