const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.question.createMany({
    data: [
      // SCIENCE QUESTIONS (20+)
      {
        topic: 'science',
        question: 'What planet is closest to the Sun?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Mercury', 'Venus', 'Mars', 'Earth']),
        correctAnswer: 'Mercury'
      },
      {
        topic: 'science',
        question: 'Which gas do plants absorb during photosynthesis?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen']),
        correctAnswer: 'Carbon Dioxide'
      },
      {
        topic: 'science',
        question: 'What is the chemical symbol for gold?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Ag', 'Au', 'Fe', 'Cu']),
        correctAnswer: 'Au'
      },
      {
        topic: 'science',
        question: 'Which element has the atomic number 1?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Helium', 'Hydrogen', 'Oxygen', 'Carbon']),
        correctAnswer: 'Hydrogen'
      },
      {
        topic: 'science',
        question: 'What is the hardest natural substance on Earth?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Steel', 'Diamond', 'Granite', 'Iron']),
        correctAnswer: 'Diamond'
      },
      {
        topic: 'science',
        question: 'What is the largest organ in the human body?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Heart', 'Brain', 'Liver', 'Skin']),
        correctAnswer: 'Skin'
      },
      {
        topic: 'science',
        question: 'What is the speed of light in meters per second?',
        type: 'free_text',
        choices: null,
        correctAnswer: '299792458'
      },
      {
        topic: 'science',
        question: 'What is the chemical formula for water?',
        type: 'multiple_choice',
        choices: JSON.stringify(['H2O', 'CO2', 'O2', 'N2']),
        correctAnswer: 'H2O'
      },
      {
        topic: 'science',
        question: 'Which planet is known as the Red Planet?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Venus', 'Mars', 'Jupiter', 'Saturn']),
        correctAnswer: 'Mars'
      },
      {
        topic: 'science',
        question: 'What is the study of fossils called?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Paleontology', 'Archaeology', 'Geology', 'Biology']),
        correctAnswer: 'Paleontology'
      },
      {
        topic: 'science',
        question: 'What is the atomic number of carbon?',
        type: 'multiple_choice',
        choices: JSON.stringify(['4', '6', '8', '12']),
        correctAnswer: '6'
      },
      {
        topic: 'science',
        question: 'What is the largest planet in our solar system?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Saturn', 'Jupiter', 'Neptune', 'Uranus']),
        correctAnswer: 'Jupiter'
      },
      {
        topic: 'science',
        question: 'What is the chemical symbol for iron?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Ir', 'Fe', 'In', 'I']),
        correctAnswer: 'Fe'
      },
      {
        topic: 'science',
        question: 'What is the process by which plants make their own food?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation']),
        correctAnswer: 'Photosynthesis'
      },
      {
        topic: 'science',
        question: 'What is the atomic number of oxygen?',
        type: 'multiple_choice',
        choices: JSON.stringify(['6', '7', '8', '9']),
        correctAnswer: '8'
      },
      {
        topic: 'science',
        question: 'What is the study of earthquakes called?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Seismology', 'Volcanology', 'Meteorology', 'Oceanography']),
        correctAnswer: 'Seismology'
      },
      {
        topic: 'science',
        question: 'What is the chemical symbol for silver?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Si', 'Ag', 'Sr', 'Au']),
        correctAnswer: 'Ag'
      },
      {
        topic: 'science',
        question: 'What is the largest bone in the human body?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Femur', 'Humerus', 'Tibia', 'Fibula']),
        correctAnswer: 'Femur'
      },
      {
        topic: 'science',
        question: 'What is the atomic number of nitrogen?',
        type: 'multiple_choice',
        choices: JSON.stringify(['5', '6', '7', '8']),
        correctAnswer: '7'
      },
      {
        topic: 'science',
        question: 'What is the chemical symbol for copper?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Co', 'Cu', 'Cp', 'Cr']),
        correctAnswer: 'Cu'
      },
      {
        topic: 'science',
        question: 'What is the study of weather called?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Meteorology', 'Climatology', 'Atmospheric Science', 'Weather Science']),
        correctAnswer: 'Meteorology'
      },
      {
        topic: 'science',
        question: 'What is the atomic number of helium?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1', '2', '3', '4']),
        correctAnswer: '2'
      },

      // HISTORY QUESTIONS (20+)
      {
        topic: 'history',
        question: 'In which year did World War II end?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1943', '1944', '1945', '1946']),
        correctAnswer: '1945'
      },
      {
        topic: 'history',
        question: 'Who was the first President of the United States?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin']),
        correctAnswer: 'George Washington'
      },
      {
        topic: 'history',
        question: 'In which year did Columbus discover America?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1490', '1491', '1492', '1493']),
        correctAnswer: '1492'
      },
      {
        topic: 'history',
        question: 'Who was the first Emperor of Rome?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Julius Caesar', 'Augustus', 'Nero', 'Caligula']),
        correctAnswer: 'Augustus'
      },
      {
        topic: 'history',
        question: 'In which year did the Titanic sink?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1910', '1911', '1912', '1913']),
        correctAnswer: '1912'
      },
      {
        topic: 'history',
        question: 'Who was the first female Prime Minister of the UK?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Margaret Thatcher', 'Theresa May', 'Liz Truss', 'None of the above']),
        correctAnswer: 'Margaret Thatcher'
      },
      {
        topic: 'history',
        question: 'In which year did World War I begin?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1913', '1914', '1915', '1916']),
        correctAnswer: '1914'
      },
      {
        topic: 'history',
        question: 'Who was the first Emperor of China?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Qin Shi Huang', 'Han Wudi', 'Tang Taizong', 'Song Taizu']),
        correctAnswer: 'Qin Shi Huang'
      },
      {
        topic: 'history',
        question: 'In which year did the Berlin Wall fall?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1987', '1988', '1989', '1990']),
        correctAnswer: '1989'
      },
      {
        topic: 'history',
        question: 'Who was the first King of England?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Alfred the Great', 'William the Conqueror', 'Henry I', 'Stephen']),
        correctAnswer: 'William the Conqueror'
      },
      {
        topic: 'history',
        question: 'In which year did the French Revolution begin?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1787', '1788', '1789', '1790']),
        correctAnswer: '1789'
      },
      {
        topic: 'history',
        question: 'Who was the first Emperor of Japan?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Jimmu', 'Suizei', 'Annei', 'Itoku']),
        correctAnswer: 'Jimmu'
      },
      {
        topic: 'history',
        question: 'In which year did the American Civil War end?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1863', '1864', '1865', '1866']),
        correctAnswer: '1865'
      },
      {
        topic: 'history',
        question: 'Who was the first Tsar of Russia?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Ivan the Terrible', 'Peter the Great', 'Catherine the Great', 'Nicholas I']),
        correctAnswer: 'Ivan the Terrible'
      },
      {
        topic: 'history',
        question: 'In which year did the Russian Revolution occur?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1915', '1916', '1917', '1918']),
        correctAnswer: '1917'
      },
      {
        topic: 'history',
        question: 'Who was the first President of France?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Napoleon Bonaparte', 'Louis-Napoleon', 'Adolphe Thiers', 'Patrice de MacMahon']),
        correctAnswer: 'Louis-Napoleon'
      },
      {
        topic: 'history',
        question: 'In which year did the Declaration of Independence get signed?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1774', '1775', '1776', '1777']),
        correctAnswer: '1776'
      },
      {
        topic: 'history',
        question: 'Who was the first Emperor of the Holy Roman Empire?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Charlemagne', 'Otto I', 'Frederick I', 'Charles V']),
        correctAnswer: 'Charlemagne'
      },
      {
        topic: 'history',
        question: 'In which year did the Spanish Armada sail?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1586', '1587', '1588', '1589']),
        correctAnswer: '1588'
      },
      {
        topic: 'history',
        question: 'Who was the first King of Scotland?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Kenneth I', 'Donald I', 'Constantine I', 'Aed']),
        correctAnswer: 'Kenneth I'
      },
      {
        topic: 'history',
        question: 'In which year did the Magna Carta get signed?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1213', '1214', '1215', '1216']),
        correctAnswer: '1215'
      },

      // MOVIES QUESTIONS (20+)
      {
        topic: 'movies',
        question: 'What year was the first Star Wars movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1975', '1976', '1977', '1978']),
        correctAnswer: '1977'
      },
      {
        topic: 'movies',
        question: 'Who played Iron Man in the Marvel Cinematic Universe?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo']),
        correctAnswer: 'Robert Downey Jr.'
      },
      {
        topic: 'movies',
        question: 'What year was the first Jurassic Park movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1991', '1992', '1993', '1994']),
        correctAnswer: '1993'
      },
      {
        topic: 'movies',
        question: 'Who directed the movie Titanic?',
        type: 'multiple_choice',
        choices: JSON.stringify(['James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Peter Jackson']),
        correctAnswer: 'James Cameron'
      },
      {
        topic: 'movies',
        question: 'What year was the first Lord of the Rings movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1999', '2000', '2001', '2002']),
        correctAnswer: '2001'
      },
      {
        topic: 'movies',
        question: 'Who played Captain Jack Sparrow in Pirates of the Caribbean?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Orlando Bloom', 'Johnny Depp', 'Geoffrey Rush', 'Bill Nighy']),
        correctAnswer: 'Johnny Depp'
      },
      {
        topic: 'movies',
        question: 'What year was the first Harry Potter movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1999', '2000', '2001', '2002']),
        correctAnswer: '2001'
      },
      {
        topic: 'movies',
        question: 'Who played Neo in The Matrix?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Keanu Reeves', 'Laurence Fishburne', 'Hugo Weaving', 'Carrie-Anne Moss']),
        correctAnswer: 'Keanu Reeves'
      },
      {
        topic: 'movies',
        question: 'What year was the first Toy Story movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1993', '1994', '1995', '1996']),
        correctAnswer: '1995'
      },
      {
        topic: 'movies',
        question: 'Who played Forrest Gump in the movie of the same name?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Tom Hanks', 'Gary Sinise', 'Robin Wright', 'Sally Field']),
        correctAnswer: 'Tom Hanks'
      },
      {
        topic: 'movies',
        question: 'What year was the first Mission: Impossible movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1994', '1995', '1996', '1997']),
        correctAnswer: '1996'
      },
      {
        topic: 'movies',
        question: 'Who played the Joker in The Dark Knight?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Heath Ledger', 'Jared Leto', 'Joaquin Phoenix', 'Jack Nicholson']),
        correctAnswer: 'Heath Ledger'
      },
      {
        topic: 'movies',
        question: 'What year was the first Avatar movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['2007', '2008', '2009', '2010']),
        correctAnswer: '2009'
      },
      {
        topic: 'movies',
        question: 'Who played Tony Stark in Iron Man?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Robert Downey Jr.', 'Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo']),
        correctAnswer: 'Robert Downey Jr.'
      },
      {
        topic: 'movies',
        question: 'What year was the first Shrek movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1999', '2000', '2001', '2002']),
        correctAnswer: '2001'
      },
      {
        topic: 'movies',
        question: 'Who played Luke Skywalker in the original Star Wars trilogy?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Alec Guinness']),
        correctAnswer: 'Mark Hamill'
      },
      {
        topic: 'movies',
        question: 'What year was the first Spider-Man movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['2000', '2001', '2002', '2003']),
        correctAnswer: '2002'
      },
      {
        topic: 'movies',
        question: 'Who played Captain America in the Marvel Cinematic Universe?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo']),
        correctAnswer: 'Chris Evans'
      },
      {
        topic: 'movies',
        question: 'What year was the first Batman movie with Christian Bale released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['2003', '2004', '2005', '2006']),
        correctAnswer: '2005'
      },
      {
        topic: 'movies',
        question: 'Who played Thor in the Marvel Cinematic Universe?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo']),
        correctAnswer: 'Chris Hemsworth'
      },
      {
        topic: 'movies',
        question: 'What year was the first Finding Nemo movie released?',
        type: 'multiple_choice',
        choices: JSON.stringify(['2001', '2002', '2003', '2004']),
        correctAnswer: '2003'
      },

      // GEOGRAPHY QUESTIONS (20+)
      {
        topic: 'geography',
        question: 'What is the capital of France?',
        type: 'multiple_choice',
        choices: JSON.stringify(['London', 'Berlin', 'Paris', 'Madrid']),
        correctAnswer: 'Paris'
      },
      {
        topic: 'geography',
        question: 'What is the largest country in the world by area?',
        type: 'multiple_choice',
        choices: JSON.stringify(['China', 'United States', 'Canada', 'Russia']),
        correctAnswer: 'Russia'
      },
      {
        topic: 'geography',
        question: 'What is the capital of Japan?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Seoul', 'Beijing', 'Tokyo', 'Bangkok']),
        correctAnswer: 'Tokyo'
      },
      {
        topic: 'geography',
        question: 'What is the longest river in the world?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Amazon', 'Nile', 'Yangtze', 'Mississippi']),
        correctAnswer: 'Nile'
      },
      {
        topic: 'geography',
        question: 'What is the capital of Australia?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Sydney', 'Melbourne', 'Canberra', 'Brisbane']),
        correctAnswer: 'Canberra'
      },
      {
        topic: 'geography',
        question: 'What is the largest ocean on Earth?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Atlantic', 'Indian', 'Arctic', 'Pacific']),
        correctAnswer: 'Pacific'
      },
      {
        topic: 'geography',
        question: 'What is the capital of Brazil?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador']),
        correctAnswer: 'Brasília'
      },
      {
        topic: 'geography',
        question: 'What is the highest mountain in the world?',
        type: 'multiple_choice',
        choices: JSON.stringify(['K2', 'Mount Everest', 'Kangchenjunga', 'Lhotse']),
        correctAnswer: 'Mount Everest'
      },
      {
        topic: 'geography',
        question: 'What is the capital of Canada?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Toronto', 'Montreal', 'Vancouver', 'Ottawa']),
        correctAnswer: 'Ottawa'
      },
      {
        topic: 'geography',
        question: 'What is the largest desert in the world?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Sahara', 'Arabian', 'Gobi', 'Antarctic']),
        correctAnswer: 'Antarctic'
      },
      {
        topic: 'geography',
        question: 'What is the capital of India?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Mumbai', 'Delhi', 'Kolkata', 'Chennai']),
        correctAnswer: 'Delhi'
      },
      {
        topic: 'geography',
        question: 'What is the largest lake in Africa?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Lake Victoria', 'Lake Tanganyika', 'Lake Malawi', 'Lake Chad']),
        correctAnswer: 'Lake Victoria'
      },
      {
        topic: 'geography',
        question: 'What is the capital of South Africa?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Johannesburg', 'Cape Town', 'Pretoria', 'Durban']),
        correctAnswer: 'Pretoria'
      },
      {
        topic: 'geography',
        question: 'What is the largest island in the world?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Greenland', 'New Guinea', 'Borneo', 'Madagascar']),
        correctAnswer: 'Greenland'
      },
      {
        topic: 'geography',
        question: 'What is the capital of Egypt?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Alexandria', 'Cairo', 'Giza', 'Luxor']),
        correctAnswer: 'Cairo'
      },
      {
        topic: 'geography',
        question: 'What is the largest country in South America?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Argentina', 'Brazil', 'Peru', 'Colombia']),
        correctAnswer: 'Brazil'
      },
      {
        topic: 'geography',
        question: 'What is the capital of China?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']),
        correctAnswer: 'Beijing'
      },
      {
        topic: 'geography',
        question: 'What is the largest volcano in the world?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Mauna Loa', 'Mount Etna', 'Mount Vesuvius', 'Krakatoa']),
        correctAnswer: 'Mauna Loa'
      },
      {
        topic: 'geography',
        question: 'What is the capital of Mexico?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Guadalajara', 'Monterrey', 'Mexico City', 'Puebla']),
        correctAnswer: 'Mexico City'
      },
      {
        topic: 'geography',
        question: 'What is the largest rainforest in the world?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Congo', 'Amazon', 'Borneo', 'Daintree']),
        correctAnswer: 'Amazon'
      },
      {
        topic: 'geography',
        question: 'What is the capital of Argentina?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza']),
        correctAnswer: 'Buenos Aires'
      },
      {
        topic: 'geography',
        question: 'What is the largest coral reef system in the world?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Great Barrier Reef', 'Belize Barrier Reef', 'Maldives', 'Red Sea']),
        correctAnswer: 'Great Barrier Reef'
      },

      // SPORTS QUESTIONS (20+)
      {
        topic: 'sports',
        question: 'Which country has won the most FIFA World Cups?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Germany', 'Argentina', 'Brazil', 'Italy']),
        correctAnswer: 'Brazil'
      },
      {
        topic: 'sports',
        question: 'How many players are on a basketball court at once?',
        type: 'multiple_choice',
        choices: JSON.stringify(['8', '10', '12', '14']),
        correctAnswer: '10'
      },
      {
        topic: 'sports',
        question: 'Which sport is known as "The Beautiful Game"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Basketball', 'Soccer', 'Tennis', 'Golf']),
        correctAnswer: 'Soccer'
      },
      {
        topic: 'sports',
        question: 'How many players are on a baseball field during a game?',
        type: 'multiple_choice',
        choices: JSON.stringify(['16', '18', '20', '22']),
        correctAnswer: '18'
      },
      {
        topic: 'sports',
        question: 'Which country has won the most Olympic medals?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Soviet Union', 'United States', 'China', 'Germany']),
        correctAnswer: 'United States'
      },
      {
        topic: 'sports',
        question: 'How many players are on a volleyball court?',
        type: 'multiple_choice',
        choices: JSON.stringify(['10', '12', '14', '16']),
        correctAnswer: '12'
      },
      {
        topic: 'sports',
        question: 'Which sport uses a shuttlecock?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Tennis', 'Badminton', 'Squash', 'Racquetball']),
        correctAnswer: 'Badminton'
      },
      {
        topic: 'sports',
        question: 'How many players are on a soccer field during a game?',
        type: 'multiple_choice',
        choices: JSON.stringify(['20', '22', '24', '26']),
        correctAnswer: '22'
      },
      {
        topic: 'sports',
        question: 'Which country has won the most Wimbledon tennis championships?',
        type: 'multiple_choice',
        choices: JSON.stringify(['United States', 'United Kingdom', 'Australia', 'Switzerland']),
        correctAnswer: 'United States'
      },
      {
        topic: 'sports',
        question: 'How many players are on a hockey team?',
        type: 'multiple_choice',
        choices: JSON.stringify(['10', '11', '12', '13']),
        correctAnswer: '12'
      },
      {
        topic: 'sports',
        question: 'Which sport is played on a diamond-shaped field?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Cricket', 'Baseball', 'Softball', 'Rounders']),
        correctAnswer: 'Baseball'
      },
      {
        topic: 'sports',
        question: 'How many players are on a rugby team?',
        type: 'multiple_choice',
        choices: JSON.stringify(['13', '14', '15', '16']),
        correctAnswer: '15'
      },
      {
        topic: 'sports',
        question: 'Which country has won the most Formula 1 championships?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Germany', 'United Kingdom', 'Brazil', 'Italy']),
        correctAnswer: 'United Kingdom'
      },
      {
        topic: 'sports',
        question: 'How many players are on a cricket team?',
        type: 'multiple_choice',
        choices: JSON.stringify(['9', '10', '11', '12']),
        correctAnswer: '11'
      },
      {
        topic: 'sports',
        question: 'Which sport uses a puck?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Hockey', 'Lacrosse', 'Hurling', 'Shinty']),
        correctAnswer: 'Hockey'
      },
      {
        topic: 'sports',
        question: 'How many players are on a tennis court during a singles match?',
        type: 'multiple_choice',
        choices: JSON.stringify(['2', '4', '6', '8']),
        correctAnswer: '2'
      },
      {
        topic: 'sports',
        question: 'Which country has won the most NBA championships?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Los Angeles Lakers', 'Boston Celtics', 'Chicago Bulls', 'Golden State Warriors']),
        correctAnswer: 'Boston Celtics'
      },
      {
        topic: 'sports',
        question: 'How many players are on a golf course during a typical round?',
        type: 'multiple_choice',
        choices: JSON.stringify(['1', '2', '3', '4']),
        correctAnswer: '4'
      },
      {
        topic: 'sports',
        question: 'Which sport is known as "The King of Sports"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Boxing', 'Wrestling', 'Mixed Martial Arts', 'Kickboxing']),
        correctAnswer: 'Boxing'
      },
      {
        topic: 'sports',
        question: 'How many players are on a table tennis table?',
        type: 'multiple_choice',
        choices: JSON.stringify(['2', '4', '6', '8']),
        correctAnswer: '2'
      },
      {
        topic: 'sports',
        question: 'Which country has won the most Olympic gold medals?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Soviet Union', 'United States', 'China', 'Germany']),
        correctAnswer: 'United States'
      },

      // ENTERTAINMENT QUESTIONS (20+)
      {
        topic: 'entertainment',
        question: 'Who is known as the "King of Pop"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Michael Jackson', 'Elvis Presley', 'Prince', 'David Bowie']),
        correctAnswer: 'Michael Jackson'
      },
      {
        topic: 'entertainment',
        question: 'Which band released the album "Abbey Road"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['The Rolling Stones', 'The Beatles', 'The Who', 'Pink Floyd']),
        correctAnswer: 'The Beatles'
      },
      {
        topic: 'entertainment',
        question: 'Who played the role of Jack in Titanic?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Leonardo DiCaprio', 'Brad Pitt', 'Tom Cruise', 'Johnny Depp']),
        correctAnswer: 'Leonardo DiCaprio'
      },
      {
        topic: 'entertainment',
        question: 'Which TV show features the character Walter White?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Breaking Bad', 'The Sopranos', 'Game of Thrones', 'The Wire']),
        correctAnswer: 'Breaking Bad'
      },
      {
        topic: 'entertainment',
        question: 'Who is the lead singer of Queen?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Freddie Mercury', 'Brian May', 'Roger Taylor', 'John Deacon']),
        correctAnswer: 'Freddie Mercury'
      },
      {
        topic: 'entertainment',
        question: 'Which movie won Best Picture at the 2020 Oscars?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Parasite', '1917', 'Joker', 'Once Upon a Time in Hollywood']),
        correctAnswer: 'Parasite'
      },
      {
        topic: 'entertainment',
        question: 'Who played the role of Tony Stark in Iron Man?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Robert Downey Jr.', 'Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo']),
        correctAnswer: 'Robert Downey Jr.'
      },
      {
        topic: 'entertainment',
        question: 'Which band released the album "Dark Side of the Moon"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Pink Floyd', 'Led Zeppelin', 'The Who', 'The Rolling Stones']),
        correctAnswer: 'Pink Floyd'
      },
      {
        topic: 'entertainment',
        question: 'Who played the role of Hermione in Harry Potter?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Emma Watson', 'Emma Stone', 'Emma Roberts', 'Emma Thompson']),
        correctAnswer: 'Emma Watson'
      },
      {
        topic: 'entertainment',
        question: 'Which TV show features the character Don Draper?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Mad Men', 'Breaking Bad', 'The Sopranos', 'The Wire']),
        correctAnswer: 'Mad Men'
      },
      {
        topic: 'entertainment',
        question: 'Who is known as the "Queen of Pop"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Madonna', 'Beyoncé', 'Lady Gaga', 'Britney Spears']),
        correctAnswer: 'Madonna'
      },
      {
        topic: 'entertainment',
        question: 'Which movie won Best Picture at the 2019 Oscars?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Green Book', 'Roma', 'Black Panther', 'Bohemian Rhapsody']),
        correctAnswer: 'Green Book'
      },
      {
        topic: 'entertainment',
        question: 'Who played the role of Luke Skywalker in Star Wars?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'Alec Guinness']),
        correctAnswer: 'Mark Hamill'
      },
      {
        topic: 'entertainment',
        question: 'Which band released the album "Sgt. Pepper\'s Lonely Hearts Club Band"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['The Rolling Stones', 'The Beatles', 'The Who', 'Pink Floyd']),
        correctAnswer: 'The Beatles'
      },
      {
        topic: 'entertainment',
        question: 'Who played the role of Katniss in The Hunger Games?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Jennifer Lawrence', 'Emma Stone', 'Kristen Stewart', 'Shailene Woodley']),
        correctAnswer: 'Jennifer Lawrence'
      },
      {
        topic: 'entertainment',
        question: 'Which TV show features the character Tyrion Lannister?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Game of Thrones', 'Breaking Bad', 'The Sopranos', 'The Wire']),
        correctAnswer: 'Game of Thrones'
      },
      {
        topic: 'entertainment',
        question: 'Who is known as the "King of Rock and Roll"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Elvis Presley', 'Chuck Berry', 'Little Richard', 'Buddy Holly']),
        correctAnswer: 'Elvis Presley'
      },
      {
        topic: 'entertainment',
        question: 'Which movie won Best Picture at the 2018 Oscars?',
        type: 'multiple_choice',
        choices: JSON.stringify(['The Shape of Water', 'Three Billboards', 'Get Out', 'Dunkirk']),
        correctAnswer: 'The Shape of Water'
      },
      {
        topic: 'entertainment',
        question: 'Who played the role of Harry Potter?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Daniel Radcliffe', 'Rupert Grint', 'Tom Felton', 'Matthew Lewis']),
        correctAnswer: 'Daniel Radcliffe'
      },
      {
        topic: 'entertainment',
        question: 'Which band released the album "Led Zeppelin IV"?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Pink Floyd', 'Led Zeppelin', 'The Who', 'The Rolling Stones']),
        correctAnswer: 'Led Zeppelin'
      },
      {
        topic: 'entertainment',
        question: 'Who played the role of Bella in Twilight?',
        type: 'multiple_choice',
        choices: JSON.stringify(['Kristen Stewart', 'Emma Stone', 'Jennifer Lawrence', 'Shailene Woodley']),
        correctAnswer: 'Kristen Stewart'
      },
      {
        topic: 'entertainment',
        question: 'Which TV show features the character Tony Soprano?',
        type: 'multiple_choice',
        choices: JSON.stringify(['The Sopranos', 'Breaking Bad', 'Mad Men', 'The Wire']),
        correctAnswer: 'The Sopranos'
      }
    ]
  });

  console.log('✅ Test questions inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
