insert into user(user_name, first_name, last_name, birthday) values('pbeahan', 'Damarcus', 'Hickle', '1972-12-02');
insert into user(user_name, first_name, last_name, birthday) values('marlanaferry', 'Noemie', 'Senger', '1958-08-28');
insert into user(user_name, first_name, last_name, birthday) values('nadercielo', 'Trudie', 'Jast', '1946-09-14');
insert into user(user_name, first_name, last_name, birthday) values('lyndseymedhurst', 'Crawford', 'Hudson', '1948-06-13');
insert into user(user_name, first_name, last_name, birthday) values('mraziridian', 'Johnathan', 'Mills', '1998-09-27');
insert into user(user_name, first_name, last_name, birthday) values('qcrist', 'Shelby', 'Braun', '1984-01-21');
insert into user(user_name, first_name, last_name, birthday) values('konopelskiardeth', 'Regan', 'Kuhlman', '1973-10-29');
insert into user(user_name, first_name, last_name, birthday) values('zulaufjaylen', 'Randi', 'Ondricka', '2001-11-14');
insert into user(user_name, first_name, last_name, birthday) values('oschiller', 'Desean', 'Carroll', '1974-08-16');
insert into user(user_name, first_name, last_name, birthday) values('jamin97', 'Squire', 'Lynch', '2004-03-25');

insert into groups(group_name) values('admin');
insert into groups(group_name) values('user');
insert into groups(group_name) values('guest');

insert into user_group(user_id, group_id) values(1, 1);
insert into user_group(user_id, group_id) values(1, 2);
insert into user_group(user_id, group_id) values(2, 1);
insert into user_group(user_id, group_id) values(2, 2);
insert into user_group(user_id, group_id) values(3, 2);
insert into user_group(user_id, group_id) values(4, 2);
insert into user_group(user_id, group_id) values(5, 3);
insert into user_group(user_id, group_id) values(6, 3);

