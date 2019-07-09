-- SCHEMA: public

-- DROP SCHEMA public ;

CREATE SCHEMA public
    AUTHORIZATION postgres;

COMMENT ON SCHEMA public
    IS 'standard public schema';

GRANT ALL ON SCHEMA public TO postgres;

GRANT ALL ON SCHEMA public TO PUBLIC;

-- Table: public.author

DROP TABLE public.author;

CREATE TABLE public.author
(
    id integer NOT NULL DEFAULT nextval('author_id_seq'::regclass),
    lname character varying(30) COLLATE pg_catalog."default" NOT NULL,
    fname character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT author_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.author
    OWNER to "Bookish";

-- Table: public.book

DROP TABLE public.book;

CREATE TABLE public.book
(
    id integer NOT NULL DEFAULT nextval('book_id_seq'::regclass),
    title character varying(100) COLLATE pg_catalog."default" NOT NULL,
    authorid integer NOT NULL,
    isbn character varying(13) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT book_pkey PRIMARY KEY (id),
    CONSTRAINT authorid FOREIGN KEY (authorid)
        REFERENCES public.author (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.book
    OWNER to "Bookish";

-- Table: public.entry

DROP TABLE public.entry;

CREATE TABLE public.entry
(
    id integer NOT NULL DEFAULT nextval('entry_id_seq'::regclass),
    bookid integer NOT NULL,
    label character varying(20) COLLATE pg_catalog."default" NOT NULL,
    edition integer NOT NULL,
    CONSTRAINT entry_pkey PRIMARY KEY (id),
    CONSTRAINT bookid FOREIGN KEY (bookid)
        REFERENCES public.book (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.entry
    OWNER to "Bookish";

-- Table: public.member

DROP TABLE public.member;

CREATE TABLE public.member
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    balance money NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.member
    OWNER to "Bookish";

-- Table: public.loan

DROP TABLE public.loan;

CREATE TABLE public.loan
(
    id integer NOT NULL DEFAULT nextval('loan_id_seq'::regclass),
    entryid integer NOT NULL,
    userid integer NOT NULL,
    loandate daterange NOT NULL,
    CONSTRAINT loan_pkey PRIMARY KEY (id),
    CONSTRAINT entryid FOREIGN KEY (entryid)
        REFERENCES public.entry (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT userid FOREIGN KEY (userid)
        REFERENCES public.member (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.loan
    OWNER to "Bookish";