/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo schools scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.schools.remove({});
db.deleted_schools.remove({});

const schoolsDB = [
  {
    id: 1,
    name: 'UNIVERSITY OF PHOENIX-ARIZONA',
    address: '1625 WEST FOUNTAINHEAD PARKWAY',
    state: 'AZ',
    zip: '85282',
    website: 'www.phoenix.edu',
    rating: 5,
    ratingcount: 2,
    keywords: ['Good', 'Expensive'],
    comments: ['recent comments', '2 comments'],
  },

  {
    id: 2,
    name: 'BAPTIST THEOLOGICAL SEMINARY AT RICHMOND',
    address: '8040 VILLA PARK DRIVE',
    state: 'VA',
    zip: '23228',
    website: 'www.btsr.edu',
    rating: 3,
    ratingcount: 2,
    keywords: ['Bad', 'Cheap'],
    comments: ['A recent comments', '2nd comments'],
  },
  {
    id: 3,
    name: 'OHIO STATE UNIVERSITY-MAIN CAMPUS',
    address: '190 N. OVAL MALL',
    state: 'OH',
    zip: '43210',
    website: 'www.osu.edu/',
    rating: 3,
    ratingcount: 2,
    keywords: ['Bad', 'Cheap'],
    comments: ['A recent comments', '3nd comments'],
  },
  {
    id: 4,
    name: 'LONE STAR COLLEGE SYSTEM',
    address: '5000 RESEARCH FOREST DRIVE',
    state: 'TX',
    zip: '77381',
    website: 'www.lonestar.edu',
    rating: 3,
    ratingcount: 2,
    keywords: ['Good', 'Cheap'],
    comments: ['A recent comments', '2nd comments'],
  },
  {
    id: 5,
    name: 'MIAMI DADE COLLEGE',
    address: '300 NE 2ND AVENUE',
    state: 'FL',
    zip: '33132',
    website: 'www.mdc.edu/main/',
    rating: 3,
    ratingcount: 2,
    keywords: ['Expensive', 'Cheap'],
    comments: ['A recent comments', 'hellow comments'],
  },
  {
    id: 6,
    name: 'TEXAS A & M UNIVERSITY-COLLEGE STATION',
    address: '805 RUDDER TOWER',
    state: 'TX',
    zip: '77843',
    website: 'www.tamu.edu',
    rating: 5,
    ratingcount: 2,
    keywords: ['Bad', 'Cheap'],
    comments: ['A recent comments', '6 comments'],
  },
];

db.schools.insertMany(schoolsDB);
const count = db.schools.count();
print('Inserted', count, 'schools');

db.counters.remove({ _id: 'schools' });
db.counters.insert({ _id: 'schools', current: count });

db.schools.createIndex({ id: 1 }, { unique: true });
db.deleted_schools.createIndex({ id: 1 }, { unique: true });
db.schools.createIndex({ address: 1 });
db.schools.createIndex({ state: 1 });
db.schools.createIndex({ zip: 1 });
db.schools.createIndex({ rating: 1 });
