 insert into "users" ("username", "password")
values
('max','$argon2i$v=19$m=16,t=2,p=1$cUdBQUJRYnF2akRva3BqbA$qx31xcW91hecjTN4n3UBkeflmKvG8yAPwTYk+JilMoQ'),
('edward','$argon2i$v=19$m=16,t=2,p=1$czJFVlZCZVRoVmdKQ2t5NQ$uUvwFrJu0KHhJf6ng31Ok/2VHMdtSg6ieROJm1Do8jc'),
('tom','$argon2i$v=19$m=16,t=2,p=1$RU9JRkkyYzNKQjFlcTZ6MA$ReVMWBd7Zy9QPDzsS0yx9aQYKMfgIvJPKiKFo95pIB8'),
('jennifer','$argon2i$v=19$m=16,t=2,p=1$eUJoRGl5STdZWlJ2Q0NMcQ$0tQbkRry1jOC1AgPm/Y7NY/oyr1dBtl7K63r0WgY7i0'),
('maddie','$argon2i$v=19$m=16,t=2,p=1$NkJHZnFzYjd6eUdSR3pwbw$QLbyejWhInGrBROtlUhSDfJhfF7miF/b0O0lZ9tUyFU');

insert into "trips" ("userId","country","city","mainPhotoUrl","review","thingsTodoScore","foodScore","peopleScore","transportScore","safetyScore")
values
('1','japan','kyoto','/images/Kyoto2.jpg','We really enjoyed our tiny house on a quiet residential street at the last stop of the metro line. It wasn’t perfect (no Airbnb is perfect) but it had more space and higher ceilings that we expected.
 It came with some “smart” devices – the microwave that had some useful programs, the bathtub we could fill by pressing a button on the kitchen wall, the cooktop that would detect when you left an empty pan and turn off by itself.
  There were also sliding doors, tatami mats, futons to sleep on and one beautiful paper window. And it didn’t matter that for the first week every morning greeted us with a fresh sprinkle of snow (which I generally hate and didn’t
  want to see again any time soon) nor that we had to blast aircon all day long to not freeze in the poorly insulated house.I was there to live my best Japanese life. Grilling fish for breakfast, properly separating the rubbish (including rinsing cans, plastic bottles and trays),
  enjoying the silence and greeting all my neighbours when I saw them on the street. Our neighbourhood was quiet, filled with small houses and equally miniature veggie gardens between them. There were a couple of big supermarkets, a pretty temple,
  a small hill with great views of the area and three cats that everyone seemed to know, feed and pet. I was told on two occasions that the grey one was the mother and the black one was the baby. I never learned the story of the third one that was always hiding and avoiding people.'
  ,'94','77','90','93','84'),

('3','japan','tokyo','/images/Tokyo1.jpg','I was staying in Ginza, which is a high-end shopping district to the south-east of Tokyo train station, but I don’t think it really matters where you stay as all areas are pretty accessible by Tokyo metro.
In a big city, it’s always a good idea to get yourself up high to get a view of the place. The Tokyo Tower (Eiffel tower look-a-like) or Tokyo City View, both close to the Akasaka / Roppongi area both offer views, but both cost money.
Instead, head to the Municipal Building to the west of Shinjuku station, where you can get up high and get a view of Tokyo for no cost. If you’re lucky, you might be able to see Mount Fuji, though I never did due to either overcast skies or hazy smog.
Also to the west of Shinjuku is the Shinjuku NS building with its amazing 30 story atrium and the Park Hyatt hotel, which is a good place to go for some expensive drinks with a great view. It’s the same hotel featured in Sofia Coppola’s Lost in Translation.
To the east of Shinjuku is some great discount shopping, as well as the red light district and the area called the Golden Gai. The Golden Gai is a number of really small alleys filled with bars that many Japanese hit after work. However,
a number of places are private clubs or don’t allow foreigners inside. Those that do allow foreigners usually charge a cover charge and pricey drinks. It’s interesting to see, but may not be a great place to drink every night.'
,'90','100','77','88','99'),

('4','norway','trondheim','/images/Trondheim.jpg','For us, Trondheim was a great opportunity to visit friends living there and to step foot in Norway for the first time. And yet another Scandinavian country that did not disappoint! Having someone local show us around was extremely helpful
 as we managed to get a good glimpse of the life in the city and what to see and do there.Let’s now take a look at some of the highlights of a long weekend in Trondheim.It’s impossible to walk around central Trondheim and not see Nidaros Cathedral towering over the other buildings.
 This cathedral from the 11th century is a gem of gothic architecture, certainly one of the most important monuments in Norway and the northernmost medieval cathedral in the world. Impressive, right? We have seen a lot of cathedrals but this is one really worth visiting,
including the interior which is very dark and different from a regular cathedral. And that’s not all, Nidaros is also the former location of coronation in Norway, now royal blessings, and an important pilgrimage destination. Just next door is the visitors center building
where you can buy tickets to visit the cathedral and the nearby Archbishop’s Palace and the Crown Regalia, which are definitely a good addition to any visit. Because we visited in May, we could not go to the top of the cathedral since it only opens during the summer.
The Market Square (Torvet) is the heart of Trondheim and when we visited, on a Saturday morning, this was clearly the busiest area with plenty of stalls selling different local produce. At the center of the square lies the monument to Viking Olav Tryggvason, which happens to be a sundial!
The nearby streets have some important buildings, namely the Church of Our Lady and Stiftsgården – a massive wooden building that acts as the local royal residence.'
,'77','79','70','82','84');
