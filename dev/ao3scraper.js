const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const ids = ['13521117', '855031', '455066', '562493', '726803', '12976434'];

const getData = ids => {
  let promises = ids.map((id) => {
    let promise = new Promise((resolve, reject) => {
      let url = 'http://archiveofourown.org/works/' + id + '?view_adult=true';
      request(url, function(error, response, body) {
        if (error) {
          console.log('Error: ' + error);
          reject(error);
        }
        console.log('Status code: ' + response.statusCode);
        const $ = cheerio.load(body);
        let obj = {
          id: id,
          title: '', 
          rating: '', 
          authors: [],
          authorsLinks: [],
          summary: '', 
          universe: '',
          language: ''
        };
        $('#workskin').filter(function(index){
          obj.title = $('h2').text().trim();
          let authors = $('a[rel="author"]');
          for (let n = 0; n < authors.length; n++) {
            let currentAuthor = $(authors).eq(n).text();
            obj.authors.push(currentAuthor);
          }
          obj.summary = $('.userstuff').eq(0).text().trim();
          for (let n = 0; n < authors.length; n++) {
            let currentLink = 'http://archiveofourown.org' + $(authors).eq(n).attr('href');
            obj.authorsLinks.push(currentLink);
          }
        });
        $('#main').filter(function(index) {
          obj.rating = $('a.tag').eq(0).text();
          let info = $('div.wrapper').eq(2).text().trim().toLocaleLowerCase();
          if (info.includes('college')) {
            obj.universe = 'College AU';
          } else if (info.includes('616')) {
            obj.universe = '616';
          } else if (info.includes('movies') || info.includes('cinematic')) {
            obj.universe = 'MCU';
          }
          obj.language = $('.language').eq(1).text().trim();
          obj.words = $('.words').eq(1).text();
        });
        resolve(obj);
      });
    });
    return promise;
  });

  Promise.all(promises).then((results) => {
    console.log("Results > "+JSON.stringify(results, null, 2));
    fs.writeFileSync(`public/data/ao3.json`, JSON.stringify(results, null, 2));
  }).catch((error) => {

  });
};

getData(ids);