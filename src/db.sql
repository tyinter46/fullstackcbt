CREATE TABLE IF NOT EXISTS public.admin
(
    id bigint NOT NULL DEFAULT nextval('admin_id_seq'::regclass),
    og_number character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (id)
)


CREATE TABLE IF NOT EXISTS public.candidates
(
    id bigint NOT NULL DEFAULT nextval('candidates_id_seq'::regclass),
    full_name character varying COLLATE pg_catalog."default",
    og_number character varying COLLATE pg_catalog."default",
    file_number character varying COLLATE pg_catalog."default",
    score integer,
    CONSTRAINT candidates_pkey PRIMARY KEY (id)
)

