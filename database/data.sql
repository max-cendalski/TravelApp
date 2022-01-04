insert into "users" ("username", "password")
values
('max','$argon2i$v=19$m=4096,t=3,p=1$Jq5BzV9Q6OmGyhYRaW1i0A$WuI1mJVIpJJyZiIi6GxnP3zhG13Np3jOsxcU2gQGp7U'),
('max1','$argon2i$v=19$m=4096,t=3,p=1$RIIqQK6gVp7E41e+VF1OqA$uQalTlGbW3MsUFrdmhzD+8wvOKPUn1OOmwleP85eSJA'),
('max2','$argon2i$v=19$m=4096,t=3,p=1$Tj30MSC0jfftI78mfYMFxw$qO6BX55FwQIXXLlkLGT043HFyFUWetV3E8MooOPSkmw'),
('max3','$argon2i$v=19$m=4096,t=3,p=1$KXrcBRAGJ3AMz0THaR8jFA$ax/JR0lo4hUeKI6jRBYHJSvCc8u/A7RD4fANOIq6kHk');

insert into "countries" ("name")
values
('Japan'),
('Tahiti');

insert into "cities" ("name","countryId")
values
('Tokyo','1'),
('Tokyo','1'),
('Kyoto','1'),
('Tokyo','1'),
('Papeete','2'),
('Moorea','2'),
('Mahina','2'),
('Mahina','2');


insert into "trips" ("userId","cityId","mainPhotoUrl","review","thingsTodoScore","foodScore","peopleScore","transportScore","safetyScore")
values
('1','1','/images/Japan1.jpg','Mayco, our guide for this 75-minute tour, tells us of Kyoto’s past as the capital of Japan from 794 to 1869, remarking that some people still consider it to be the nation’s capital over Tokyo. She goes on to illustrate several of Kyoto’s cultural offerings with a wide selection of photos and on-the-ground video footage, pausing periodically to engage her audience with questions, and fill in the story behind the visuals.

Using this hybrid presentation style, Mayco guides us into the shrine complex. We follow clusters of visitors along the wide, maple-lined walking path and up a set of stairs, catching a glimpse of the red-and-green accented building that houses the main shrine before passing through another large torii gate. Here we get our first look at one of the most famous views in Japan: the Senbon Torii, or 1000 gates.','9','3','4','3','8'),
('2','2','/images/Japan2.jpg','Mayco, our guide for this 75-minute tour, tells us of Kyoto’s past as the capital of Japan from 794 to 1869, remarking that some people still consider it to be the nation’s capital over Tokyo. She goes on to illustrate several of Kyoto’s cultural offerings with a wide selection of photos and on-the-ground video footage, pausing periodically to engage her audience with questions, and fill in the story behind the visuals.

Using this hybrid presentation style, Mayco guides us into the shrine complex. We follow clusters of visitors along the wide, maple-lined walking path and up a set of stairs, catching a glimpse of the red-and-green accented building that houses the main shrine before passing through another large torii gate. Here we get our first look at one of the most famous views in Japan: the Senbon Torii, or 1000 gates.','9','3','4','3','8'),
('2','3','/images/Japan3.jpg','Mayco, our guide for this 75-minute tour, tells us of Kyoto’s past as the capital of Japan from 794 to 1869, remarking that some people still consider it to be the nation’s capital over Tokyo. She goes on to illustrate several of Kyoto’s cultural offerings with a wide selection of photos and on-the-ground video footage, pausing periodically to engage her audience with questions, and fill in the story behind the visuals.

Using this hybrid presentation style, Mayco guides us into the shrine complex. We follow clusters of visitors along the wide, maple-lined walking path and up a set of stairs, catching a glimpse of the red-and-green accented building that houses the main shrine before passing through another large torii gate. Here we get our first look at one of the most famous views in Japan: the Senbon Torii, or 1000 gates.','9','3','4','3','8'),
('3','1','/images/Japan1.jpg','Mayco, our guide for this 75-minute tour, tells us of Kyoto’s past as the capital of Japan from 794 to 1869, remarking that some people still consider it to be the nation’s capital over Tokyo. She goes on to illustrate several of Kyoto’s cultural offerings with a wide selection of photos and on-the-ground video footage, pausing periodically to engage her audience with questions, and fill in the story behind the visuals.

Using this hybrid presentation style, Mayco guides us into the shrine complex. We follow clusters of visitors along the wide, maple-lined walking path and up a set of stairs, catching a glimpse of the red-and-green accented building that houses the main shrine before passing through another large torii gate. Here we get our first look at one of the most famous views in Japan: the Senbon Torii, or 1000 gates.','9','3','4','3','8'),
('1','5','/images/Tahiti1.jpg','Mayco, our guide for this 75-minute tour, tells us of Kyoto’s past as the capital of Japan from 794 to 1869, remarking that some people still consider it to be the nation’s capital over Tokyo. She goes on to illustrate several of Kyoto’s cultural offerings with a wide selection of photos and on-the-ground video footage, pausing periodically to engage her audience with questions, and fill in the story behind the visuals.

Using this hybrid presentation style, Mayco guides us into the shrine complex. We follow clusters of visitors along the wide, maple-lined walking path and up a set of stairs, catching a glimpse of the red-and-green accented building that houses the main shrine before passing through another large torii gate. Here we get our first look at one of the most famous views in Japan: the Senbon Torii, or 1000 gates.','9','3','4','3','8'),
('2','6','/images/Tahiti2.jpg','Mayco, our guide for this 75-minute tour, tells us of Kyoto’s past as the capital of Japan from 794 to 1869, remarking that some people still consider it to be the nation’s capital over Tokyo. She goes on to illustrate several of Kyoto’s cultural offerings with a wide selection of photos and on-the-ground video footage, pausing periodically to engage her audience with questions, and fill in the story behind the visuals.

Using this hybrid presentation style, Mayco guides us into the shrine complex. We follow clusters of visitors along the wide, maple-lined walking path and up a set of stairs, catching a glimpse of the red-and-green accented building that houses the main shrine before passing through another large torii gate. Here we get our first look at one of the most famous views in Japan: the Senbon Torii, or 1000 gates.','9','3','4','3','8'),
('2','7','/images/Tahiti3.jpg','Mayco, our guide for this 75-minute tour, tells us of Kyoto’s past as the capital of Japan from 794 to 1869, remarking that some people still consider it to be the nation’s capital over Tokyo. She goes on to illustrate several of Kyoto’s cultural offerings with a wide selection of photos and on-the-ground video footage, pausing periodically to engage her audience with questions, and fill in the story behind the visuals.

Using this hybrid presentation style, Mayco guides us into the shrine complex. We follow clusters of visitors along the wide, maple-lined walking path and up a set of stairs, catching a glimpse of the red-and-green accented building that houses the main shrine before passing through another large torii gate. Here we get our first look at one of the most famous views in Japan: the Senbon Torii, or 1000 gates.','9','3','4','3','8'),
('3','8','/images/Tahiti4.jpg','Mayco, our guide for this 75-minute tour, tells us of Kyoto’s past as the capital of Japan from 794 to 1869, remarking that some people still consider it to be the nation’s capital over Tokyo. She goes on to illustrate several of Kyoto’s cultural offerings with a wide selection of photos and on-the-ground video footage, pausing periodically to engage her audience with questions, and fill in the story behind the visuals.

Using this hybrid presentation style, Mayco guides us into the shrine complex. We follow clusters of visitors along the wide, maple-lined walking path and up a set of stairs, catching a glimpse of the red-and-green accented building that houses the main shrine before passing through another large torii gate. Here we get our first look at one of the most famous views in Japan: the Senbon Torii, or 1000 gates.','9','3','4','3','8');
