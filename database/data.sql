insert into "users" ("username", "password")
values
('max','$argon2i$v=19$m=4096,t=3,p=1$Jq5BzV9Q6OmGyhYRaW1i0A$WuI1mJVIpJJyZiIi6GxnP3zhG13Np3jOsxcU2gQGp7U'),
('max1','$argon2i$v=19$m=4096,t=3,p=1$RIIqQK6gVp7E41e+VF1OqA$uQalTlGbW3MsUFrdmhzD+8wvOKPUn1OOmwleP85eSJA'),
('max2','$argon2i$v=19$m=4096,t=3,p=1$Tj30MSC0jfftI78mfYMFxw$qO6BX55FwQIXXLlkLGT043HFyFUWetV3E8MooOPSkmw'),
('max3','$argon2i$v=19$m=4096,t=3,p=1$KXrcBRAGJ3AMz0THaR8jFA$ax/JR0lo4hUeKI6jRBYHJSvCc8u/A7RD4fANOIq6kHk');

insert into "countries" ("name")
values
('New Zealand');

insert into "cities" ("name","countryId")
values
('Wesborn','1'),
('Hamilton','1'),
('Gisborn','1'),
('Timaru','1');


insert into "trips" ("userId","cityId","mainPhotoUrl","review","thingsTodoScore","foodScore","peopleScore","transportScore","safetyScore")
values
('1','3','url','It was Amazing trip','9','3','4','3','8'),
('2','2','url','Weather was not good at all','9','3','4','3','8'),
('2','3','url','It was awesome!','9','3','4','3','8'),
('3','4','url','It was best trip in my entire life!','9','3','4','3','8');
