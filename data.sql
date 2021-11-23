create table shop(
	id serial not null primary key unique,
	name text not null unique
);

create table avo_deal(
	id serial not null primary key unique,
	shop_id int,
	qty int not null,
	price decimal(10, 2),
	foreign key (shop_id) references shop(id) 
);


insert into shop (id, name) values (1, 'Fruit & Veg City');
insert into shop (id, name) values (2, 'Tsjekkers');
insert into shop (id, name) values (3, 'Shopryte');
insert into shop (id, name) values (4, 'Pick n Play');
insert into shop (id, name) values (5, 'Fruit lovers');

