const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const firstArr = ['13521117', '855031', '455066', '562493', '726803', '12976434', '13446870', '306021'];
const secArr = ['399804', '860801', '4861586', '6893602', '6893602', '517893', '3069353', '12694110'];
const ids = firstArr.concat(secArr);

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
          language: '',
          tags: []
        };
        if ($('#workskin').length !== 0) {
          $('#workskin').filter(function(index) {
            obj.title = $('h2').text().trim();
            let authors = $('h3 a[rel="author"]');
            for (let n = 0; n < authors.length; n++) {
              let currentAuthor = $(authors).eq(n).text();
              obj.authors.push(currentAuthor);
            }
            obj.summary = $('.userstuff').eq(0).text().trim();
            for (let n = 0; n < authors.length; n++) {
              let currentLink = 'https://archiveofourown.org' + $(authors).eq(n).attr('href');
              obj.authorsLinks.push(currentLink);
            }
          });
          $('#main').filter(function(index) {
            obj.rating = $('a.tag').eq(0).text();
            let info = $('div.wrapper').eq(2).text().trim().toLocaleLowerCase();
            if (info.includes('college')) {
              obj.universe = 'College AU';
            } else if (info.includes('high school')) {
              obj.universe = 'High School AU';
            } else if (info.includes('616')) {
              obj.universe = '616';
            } else if (info.includes('Noir')) {
              obj.universe = 'Marvel Noir';
            } else if (info.includes('movies') || info.includes('cinematic')) {
              obj.universe = 'MCU';
            } else if (info.includes('teachers')) {
              obj.universe = 'Teachers AU';
            } else if (info.includes('armored adventures')) {
              obj.universe = 'Armored Adventures';
            } else if (info.includes('ultimates')) {
              obj.universe = 'Ultimate';
            } else if (info.includes('universe - vietnam')) {
              obj.universe = 'Vietnam AU';
            }
            if (info.includes('sex pollen')) {
              obj.tags.push('Sex Pollen');
            }
            if (info.includes('dubious consent')) {
              obj.tags.push('Dubious Consent');
            }
            if (info.includes('fluff')) {
              obj.tags.push('Fluff');
            }
            if (info.includes('first time')) {
              obj.tags.push('First Time');
            }
            if (info.includes('first kiss')) {
              obj.tags.push('First Kiss');
            }
            if (info.includes('smut')) {
              obj.tags.push('Smut');
            }
            if (info.includes('canon divergence')) {
              obj.tags.push('Canon Divergence');
            }
            if (info.includes('identity porn')) {
              obj.tags.push('Identity Porn');
            }
            if (info.includes('getting together')) {
              obj.tags.push('Getting Together');
            }
            if (info.includes('angst')) {
              obj.tags.push('Angst');
            }
            if (info.includes('dirty talk')) {
              obj.tags.push('Dirty Talk');
            }
            if (info.includes('fix-it') || info.includes('fix it')) {
              obj.tags.push('Fix-It');
            }
            if (info.includes('friends with benefits')) {
              obj.tags.push('Friends With Benefits');
            }
            if (info.includes('farmhouse of love')) {
              obj.tags.push('Farmhouse of Love');
            }
            if (info.includes('action') || info.includes('adventure')) {
              obj.tags.push('Action/Adventure');
            }
            if (info.includes('hurt/comfort')) {
              obj.tags.push('Hurt/Comfort');
            }
            if (info.includes('christmas')) {
              obj.tags.push('Christmas');
            }
            if (info.includes('crossover') || info.includes('fusion')) {
              obj.tags.push('Crossover/Fusion');
            }
            if (info.includes('pining')) {
              obj.tags.push('Pining');
            }
            if (info.includes('misunderstandings')) {
              obj.tags.push('Misunderstandings');
            }
            if (info.includes('fake relationship') || info.includes('fake date') || info.includes('pretended relationship')) {
              obj.tags.push('Pretended Relationship');
            }
            obj.language = $('.language').eq(1).text().trim();
            obj.words = $('.words').eq(1).text();
          });
        } else {
          $('#main').filter(function(index) {
            let title = $('h4.heading').eq(0).text().trim();
            let by = title.indexOf('by');
            obj.title = title.substring(0, by).trim();
            let authors = $('h4 a[rel="author"]');
            for (let n = 0; n < authors.length; n++) {
              let currentAuthor = $(authors).eq(n).text();
              obj.authors.push(currentAuthor);
            }
            for (let n = 0; n < authors.length; n++) {
              let currentLink = 'https://archiveofourown.org' + $(authors).eq(n).attr('href');
              obj.authorsLinks.push(currentLink);
            }
            obj.summary = $('.summary').eq(0).text().trim();
            obj.rating = $('.rating').eq(0).text();
            obj.language = $('.language').eq(1).text();
            obj.words = $('.words').eq(1).text();
            let info = $('.fandoms').eq(0).text().trim().toLowerCase();
            if (info.includes('college')) {
              obj.universe = 'College AU';
            } else if (info.includes('high school')) {
              obj.universe = 'High School AU';
            } else if (info.includes('616')) {
              obj.universe = '616';
            } else if (info.includes('Noir')) {
              obj.universe = 'Marvel Noir';
            } else if (info.includes('movies') || info.includes('cinematic')) {
              obj.universe = 'MCU';
            } else if (info.includes('teachers')) {
              obj.universe = 'Teachers AU';
            } else if (info.includes('armored adventures')) {
              obj.universe = 'Armored Adventures';
            } else if (info.includes('ultimates')) {
              obj.universe = 'Ultimate';
            } else if (info.includes('universe - vietnam')) {
              obj.universe = 'Vietnam AU';
            }
            let tags = $('.tags').eq(0).text().trim().toLowerCase();
            if (tags.includes('sex pollen')) {
              obj.tags.push('Sex Pollen');
            }
            if (tags.includes('dubious consent')) {
              obj.tags.push('Dubious Consent');
            }
            if (tags.includes('fluff')) {
              obj.tags.push('Fluff');
            }
            if (tags.includes('first time')) {
              obj.tags.push('First Time');
            }
            if (tags.includes('first kiss')) {
              obj.tags.push('First Kiss');
            }
            if (tags.includes('smut')) {
              obj.tags.push('Smut');
            }
            if (tags.includes('canon divergence')) {
              obj.tags.push('Canon Divergence');
            }
            if (tags.includes('identity porn')) {
              obj.tags.push('Identity Porn');
            }
            if (tags.includes('getting together')) {
              obj.tags.push('Getting Together');
            }
            if (tags.includes('angst')) {
              obj.tags.push('Angst');
            }
            if (tags.includes('dirty talk')) {
              obj.tags.push('Dirty Talk');
            }
            if (tags.includes('fix-it') || tags.includes('fix it')) {
              obj.tags.push('Fix-It');
            }
            if (tags.includes('friends with benefits')) {
              obj.tags.push('Friends With Benefits');
            }
            if (tags.includes('farmhouse of love')) {
              obj.tags.push('Farmhouse of Love');
            }
            if (tags.includes('action') || tags.includes('adventure')) {
              obj.tags.push('Action/Adventure');
            }
            if (tags.includes('hurt/comfort')) {
              obj.tags.push('Hurt/Comfort');
            }
            if (tags.includes('christmas')) {
              obj.tags.push('Christmas');
            }
            if (tags.includes('crossover') || tags.includes('fusion')) {
              obj.tags.push('Crossover/Fusion');
            }
            if (tags.includes('pining')) {
              obj.tags.push('Pining');
            }
            if (tags.includes('misunderstandings')) {
              obj.tags.push('Misunderstandings');
            }
            if (tags.includes('fake relationship') || tags.includes('fake date') || tags.includes('pretended relationship')) {
              obj.tags.push('Pretended Relationship');
            }
          })
        }
        resolve(obj);
      });
    });
    return promise;
  });

  Promise.all(promises).then((results) => {
    console.log("Results > "+JSON.stringify(results, null, 2));
    fs.writeFileSync(`ao3.json`, JSON.stringify(results, null, 2));
  }).catch((error) => {

  });
};

getData(ids);