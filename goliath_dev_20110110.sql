--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO goliath;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO goliath;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO goliath;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO goliath;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO goliath;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO goliath;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: captcha_captchastore; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.captcha_captchastore (
    id integer NOT NULL,
    challenge character varying(32) NOT NULL,
    response character varying(32) NOT NULL,
    hashkey character varying(40) NOT NULL,
    expiration timestamp with time zone NOT NULL
);


ALTER TABLE public.captcha_captchastore OWNER TO goliath;

--
-- Name: captcha_captchastore_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.captcha_captchastore_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.captcha_captchastore_id_seq OWNER TO goliath;

--
-- Name: captcha_captchastore_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.captcha_captchastore_id_seq OWNED BY public.captcha_captchastore.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id uuid NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO goliath;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO goliath;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO goliath;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO goliath;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO goliath;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO goliath;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO goliath;

--
-- Name: inventory_brand; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.inventory_brand (
    id integer NOT NULL,
    brand character varying(64) NOT NULL,
    in_stock boolean NOT NULL,
    created_date timestamp with time zone NOT NULL,
    modified_date timestamp with time zone NOT NULL
);


ALTER TABLE public.inventory_brand OWNER TO goliath;

--
-- Name: inventory_brand_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.inventory_brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_brand_id_seq OWNER TO goliath;

--
-- Name: inventory_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.inventory_brand_id_seq OWNED BY public.inventory_brand.id;


--
-- Name: inventory_category; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.inventory_category (
    id integer NOT NULL,
    category character varying(64) NOT NULL,
    in_stock boolean NOT NULL,
    created_date timestamp with time zone NOT NULL,
    modified_date timestamp with time zone NOT NULL
);


ALTER TABLE public.inventory_category OWNER TO goliath;

--
-- Name: inventory_category_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.inventory_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_category_id_seq OWNER TO goliath;

--
-- Name: inventory_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.inventory_category_id_seq OWNED BY public.inventory_category.id;


--
-- Name: inventory_inventory; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.inventory_inventory (
    id integer NOT NULL,
    price numeric(11,2) NOT NULL,
    quantity integer NOT NULL,
    remarks text,
    remarks_json jsonb,
    created_date timestamp with time zone NOT NULL,
    modified_date timestamp with time zone NOT NULL,
    merchandise_id integer NOT NULL,
    merchant_id uuid NOT NULL,
    CONSTRAINT inventory_inventory_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.inventory_inventory OWNER TO goliath;

--
-- Name: inventory_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.inventory_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_inventory_id_seq OWNER TO goliath;

--
-- Name: inventory_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.inventory_inventory_id_seq OWNED BY public.inventory_inventory.id;


--
-- Name: inventory_merchandise; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.inventory_merchandise (
    id integer NOT NULL,
    code character varying(24) NOT NULL,
    in_stock boolean NOT NULL,
    remarks text,
    created_date timestamp with time zone NOT NULL,
    modified_date timestamp with time zone NOT NULL,
    brand_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.inventory_merchandise OWNER TO goliath;

--
-- Name: inventory_merchandise_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.inventory_merchandise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_merchandise_id_seq OWNER TO goliath;

--
-- Name: inventory_merchandise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.inventory_merchandise_id_seq OWNED BY public.inventory_merchandise.id;


--
-- Name: merchant_merchant; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.merchant_merchant (
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(64) NOT NULL,
    address character varying(128),
    mobile character varying(15) NOT NULL,
    dingding character varying(15)
);


ALTER TABLE public.merchant_merchant OWNER TO goliath;

--
-- Name: merchant_merchant_groups; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.merchant_merchant_groups (
    id integer NOT NULL,
    merchant_id uuid NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.merchant_merchant_groups OWNER TO goliath;

--
-- Name: merchant_merchant_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.merchant_merchant_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.merchant_merchant_groups_id_seq OWNER TO goliath;

--
-- Name: merchant_merchant_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.merchant_merchant_groups_id_seq OWNED BY public.merchant_merchant_groups.id;


--
-- Name: merchant_merchant_user_permissions; Type: TABLE; Schema: public; Owner: goliath
--

CREATE TABLE public.merchant_merchant_user_permissions (
    id integer NOT NULL,
    merchant_id uuid NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.merchant_merchant_user_permissions OWNER TO goliath;

--
-- Name: merchant_merchant_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: goliath
--

CREATE SEQUENCE public.merchant_merchant_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.merchant_merchant_user_permissions_id_seq OWNER TO goliath;

--
-- Name: merchant_merchant_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: goliath
--

ALTER SEQUENCE public.merchant_merchant_user_permissions_id_seq OWNED BY public.merchant_merchant_user_permissions.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: captcha_captchastore id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.captcha_captchastore ALTER COLUMN id SET DEFAULT nextval('public.captcha_captchastore_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: inventory_brand id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_brand ALTER COLUMN id SET DEFAULT nextval('public.inventory_brand_id_seq'::regclass);


--
-- Name: inventory_category id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_category ALTER COLUMN id SET DEFAULT nextval('public.inventory_category_id_seq'::regclass);


--
-- Name: inventory_inventory id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_inventory_id_seq'::regclass);


--
-- Name: inventory_merchandise id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_merchandise ALTER COLUMN id SET DEFAULT nextval('public.inventory_merchandise_id_seq'::regclass);


--
-- Name: merchant_merchant_groups id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_groups ALTER COLUMN id SET DEFAULT nextval('public.merchant_merchant_groups_id_seq'::regclass);


--
-- Name: merchant_merchant_user_permissions id; Type: DEFAULT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.merchant_merchant_user_permissions_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can add group	2	add_group
5	Can change group	2	change_group
6	Can delete group	2	delete_group
7	Can add permission	3	add_permission
8	Can change permission	3	change_permission
9	Can delete permission	3	delete_permission
10	Can add content type	4	add_contenttype
11	Can change content type	4	change_contenttype
12	Can delete content type	4	delete_contenttype
13	Can add session	5	add_session
14	Can change session	5	change_session
15	Can delete session	5	delete_session
16	Can add 库存	6	add_inventory
17	Can change 库存	6	change_inventory
18	Can delete 库存	6	delete_inventory
19	Can add 品类	7	add_category
20	Can change 品类	7	change_category
21	Can delete 品类	7	delete_category
22	Can add 商品	8	add_merchandise
23	Can change 商品	8	change_merchandise
24	Can delete 商品	8	delete_merchandise
25	Can add 品牌	9	add_brand
26	Can change 品牌	9	change_brand
27	Can delete 品牌	9	delete_brand
28	Can add 共享商户	10	add_merchant
29	Can change 共享商户	10	change_merchant
30	Can delete 共享商户	10	delete_merchant
31	Can add captcha store	11	add_captchastore
32	Can change captcha store	11	change_captchastore
33	Can delete captcha store	11	delete_captchastore
\.


--
-- Data for Name: captcha_captchastore; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.captcha_captchastore (id, challenge, response, hashkey, expiration) FROM stdin;
13	PQJT	pqjt	24307151debb0bc9cf29d2963d4389e0aecc1f8d	2019-01-05 23:01:15.507961+08
15	DHYO	dhyo	70225808b893d6d8135319fa6e204048ee5cf51b	2019-01-06 14:44:13.386457+08
16	PMOZ	pmoz	655ad05893128efd92d678147987dd6fcaab5971	2019-01-06 14:48:40.685724+08
17	RPQW	rpqw	2ce476eb4759ac51d12d9ea5a279b2bfc1eaf62c	2019-01-06 14:49:21.379311+08
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2018-12-30 23:25:17.472096+08	1	品牌: 戴尔.	1	[{"added": {}}]	9	726b1466-2eed-4e87-bb94-e5b7a1cacb03
2	2018-12-30 23:25:23.587897+08	2	品牌: 佳能.	1	[{"added": {}}]	9	726b1466-2eed-4e87-bb94-e5b7a1cacb03
3	2018-12-30 23:25:30.331652+08	1	品类: 笔记本电脑.	1	[{"added": {}}]	7	726b1466-2eed-4e87-bb94-e5b7a1cacb03
4	2018-12-30 23:25:36.335747+08	2	品类: 打印机.	1	[{"added": {}}]	7	726b1466-2eed-4e87-bb94-e5b7a1cacb03
5	2018-12-30 23:25:52.1245+08	1	商品: dl111.	1	[{"added": {}}]	8	726b1466-2eed-4e87-bb94-e5b7a1cacb03
6	2018-12-30 23:26:00.946966+08	2	商品: cn123.	1	[{"added": {}}]	8	726b1466-2eed-4e87-bb94-e5b7a1cacb03
7	2018-12-30 23:26:18.346726+08	1	库存: 商户: test1. 商品: dl111. 标价：2000 数量：2.	1	[{"added": {}}]	6	726b1466-2eed-4e87-bb94-e5b7a1cacb03
8	2018-12-30 23:26:44.937233+08	2	库存: 商户: test2. 商品: dl111. 标价：1000 数量：3.	1	[{"added": {}}]	6	726b1466-2eed-4e87-bb94-e5b7a1cacb03
9	2018-12-30 23:27:04.922274+08	3	库存: 商户: test1. 商品: cn123. 标价：90 数量：4.	1	[{"added": {}}]	6	726b1466-2eed-4e87-bb94-e5b7a1cacb03
10	2019-01-01 21:26:27.747014+08	3	商品: dl222.	1	[{"added": {}}]	8	726b1466-2eed-4e87-bb94-e5b7a1cacb03
11	2019-01-02 21:13:33.86513+08	7	库存: 商户: test3. 商品: dl222. 标价：1000 数量：50.	1	[{"added": {}}]	6	726b1466-2eed-4e87-bb94-e5b7a1cacb03
12	2019-01-02 21:41:26.047665+08	8	库存: 商户: test3. 商品: dl111. 标价：100 数量：100.	1	[{"added": {}}]	6	726b1466-2eed-4e87-bb94-e5b7a1cacb03
13	2019-01-05 15:55:04.487173+08	3	品牌: 苹果.	1	[{"added": {}}]	9	726b1466-2eed-4e87-bb94-e5b7a1cacb03
14	2019-01-05 15:55:15.530729+08	4	品牌: 索尼.	1	[{"added": {}}]	9	726b1466-2eed-4e87-bb94-e5b7a1cacb03
15	2019-01-05 15:55:22.08627+08	5	品牌: 小米.	1	[{"added": {}}]	9	726b1466-2eed-4e87-bb94-e5b7a1cacb03
16	2019-01-05 15:55:26.460866+08	6	品牌: 松下.	1	[{"added": {}}]	9	726b1466-2eed-4e87-bb94-e5b7a1cacb03
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	group
3	auth	permission
4	contenttypes	contenttype
5	sessions	session
6	inventory	inventory
7	inventory	category
8	inventory	merchandise
9	inventory	brand
10	merchant	merchant
11	captcha	captchastore
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2018-12-30 23:09:44.225393+08
2	contenttypes	0002_remove_content_type_name	2018-12-30 23:09:44.238564+08
3	auth	0001_initial	2018-12-30 23:09:44.28032+08
4	auth	0002_alter_permission_name_max_length	2018-12-30 23:09:44.305847+08
5	auth	0003_alter_user_email_max_length	2018-12-30 23:09:44.315676+08
6	auth	0004_alter_user_username_opts	2018-12-30 23:09:44.325363+08
7	auth	0005_alter_user_last_login_null	2018-12-30 23:09:44.334635+08
8	auth	0006_require_contenttypes_0002	2018-12-30 23:09:44.336582+08
9	auth	0007_alter_validators_add_error_messages	2018-12-30 23:09:44.347723+08
10	auth	0008_alter_user_username_max_length	2018-12-30 23:09:44.358356+08
11	merchant	0001_initial	2018-12-30 23:09:44.395453+08
12	admin	0001_initial	2018-12-30 23:09:44.421884+08
13	admin	0002_logentry_remove_auto_add	2018-12-30 23:09:44.43743+08
14	captcha	0001_initial	2018-12-30 23:09:44.447255+08
15	inventory	0001_initial	2018-12-30 23:09:44.503277+08
16	inventory	0002_inventory_merchant	2018-12-30 23:09:44.528659+08
17	sessions	0001_initial	2018-12-30 23:09:44.53996+08
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
cz0c1tua4nd1vq1lfai1834jseytf1u2	NDRjNDg5ZjY3YmI4ZTc5YjRkMTU0ZjFiZDE4MDI5Yzg1OTAzMjM1ZDp7fQ==	2019-01-19 22:27:22.752318+08
ypz70hha5w7mj9hfy0romt32j8et26kj	ZDAxNTVhZGU0ZmEwN2QzOTg5MTRjNjJhOWFmN2Y4ODZkMjNlNWJiOTp7Il9hdXRoX3VzZXJfaGFzaCI6IjEyYWRjZjY5ZjZmYzU4MGJiNjAxY2IwYWZkZTZhODQ3ZTIzN2FhODIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiI3MjZiMTQ2Ni0yZWVkLTRlODctYmI5NC1lNWI3YTFjYWNiMDMifQ==	2019-01-24 22:35:41.805626+08
\.


--
-- Data for Name: inventory_brand; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.inventory_brand (id, brand, in_stock, created_date, modified_date) FROM stdin;
1	戴尔	t	2018-12-30 23:25:17.44735+08	2018-12-30 23:25:17.447371+08
2	佳能	t	2018-12-30 23:25:23.586743+08	2018-12-30 23:25:23.586762+08
3	苹果	t	2019-01-05 15:55:04.484576+08	2019-01-05 15:55:04.484608+08
4	索尼	t	2019-01-05 15:55:15.529809+08	2019-01-05 15:55:15.52983+08
5	小米	t	2019-01-05 15:55:22.08515+08	2019-01-05 15:55:22.08517+08
6	松下	t	2019-01-05 15:55:26.4594+08	2019-01-05 15:55:26.459421+08
\.


--
-- Data for Name: inventory_category; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.inventory_category (id, category, in_stock, created_date, modified_date) FROM stdin;
1	笔记本电脑	t	2018-12-30 23:25:30.330298+08	2018-12-30 23:25:30.330318+08
2	打印机	t	2018-12-30 23:25:36.334681+08	2018-12-30 23:25:36.3347+08
\.


--
-- Data for Name: inventory_inventory; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.inventory_inventory (id, price, quantity, remarks, remarks_json, created_date, modified_date, merchandise_id, merchant_id) FROM stdin;
3	90.00	4		\N	2018-12-30 23:27:04.920428+08	2018-12-30 23:27:04.920449+08	2	a445041c-ee12-42a4-821c-1ca6d0c0bdab
5	1.22	100	test api	\N	2019-01-01 20:12:32.955304+08	2019-01-01 20:12:32.986333+08	2	83719796-8d17-4709-a12c-c7b56b90d7fb
6	99.00	1	test api	\N	2019-01-01 21:27:37.308748+08	2019-01-01 21:27:37.308768+08	3	83719796-8d17-4709-a12c-c7b56b90d7fb
7	1000.00	50		\N	2019-01-02 21:13:33.862852+08	2019-01-02 21:13:33.862873+08	3	b4b33695-983d-4fea-bb51-6822f76f74c2
8	100.00	96	=>withdraw=>withdraw	\N	2019-01-02 21:41:26.045971+08	2019-01-05 22:06:56.910827+08	1	b4b33695-983d-4fea-bb51-6822f76f74c2
2	221.22	212	\N	\N	2018-12-30 23:26:44.935568+08	2019-01-05 22:07:29.005333+08	1	83719796-8d17-4709-a12c-c7b56b90d7fb
1	30.22	62	test api=>test api=>test api	\N	2018-12-30 23:26:18.336224+08	2019-01-06 17:41:26.04909+08	1	a445041c-ee12-42a4-821c-1ca6d0c0bdab
\.


--
-- Data for Name: inventory_merchandise; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.inventory_merchandise (id, code, in_stock, remarks, created_date, modified_date, brand_id, category_id) FROM stdin;
1	dl111	t		2018-12-30 23:25:52.122308+08	2018-12-30 23:25:52.122329+08	1	1
2	cn123	t		2018-12-30 23:26:00.945653+08	2018-12-30 23:26:00.945682+08	2	2
3	dl222	t		2019-01-01 21:26:27.744795+08	2019-01-01 21:26:27.744816+08	1	2
\.


--
-- Data for Name: merchant_merchant; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.merchant_merchant (password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, id, name, address, mobile, dingding) FROM stdin;
pbkdf2_sha256$36000$HvfH6uvRXidk$JJTN7k2ztJSkyDN3sosFW6fVK+5rS5DU4dNehg2Vmjg=	\N	f	test2			test2@test.com	f	t	2018-12-30 23:13:56.282677+08	83719796-8d17-4709-a12c-c7b56b90d7fb	test2	test2	2222222222	test2
pbkdf2_sha256$36000$Rkhgws6jJyZx$O2WDE3R0BF9+D6s29/hXYjcn7UUhF2bHiSGl1rPCt/E=	\N	f	test4			test4@test.com	f	t	2019-01-05 22:29:47.759205+08	fc3223b5-78bf-47da-823f-a044c1fb8a4c	test4	test4	4444444444	test4
pbkdf2_sha256$36000$hPnqwJN6RkCW$W6BFvUSyOgmQnH4xX9+zraPWHnQy+2WERlO7lC5pP3c=	2019-01-10 21:22:54.813547+08	f	test5			test5@test.com	f	t	2019-01-05 22:57:20.472625+08	e02ac4cc-db80-4e52-bad8-bf0d8702a319	test5	test5	5555555555	test5
pbkdf2_sha256$36000$GYXWZkPWggAU$W0F2iKZfJUV8M3ZXbjED+vzvQNb33oovf5Dlhd6Jfeg=	2019-01-10 21:35:27.812075+08	f	test1			test1@test.com	f	t	2018-12-30 23:13:15.040385+08	a445041c-ee12-42a4-821c-1ca6d0c0bdab	test1	test1	11111111111	test1
pbkdf2_sha256$36000$DuubOXu9x1Sk$LPg5WlfCb2/L2UR/G3CfvF8ean5q/WF2eQZcf5tsAvI=	2019-01-10 21:35:52.276175+08	f	test3			test3@test.com	f	t	2019-01-02 21:13:01.118499+08	b4b33695-983d-4fea-bb51-6822f76f74c2	test3	test3	33333333333	test3
pbkdf2_sha256$36000$0fksKHER2lJC$JAHLkSsW9WsftL3Z4ueWJq6nQwqWwSrWkp5gN4pFGL0=	2019-01-10 22:35:41.799038+08	t	admin				t	t	2018-12-30 23:09:58.259939+08	726b1466-2eed-4e87-bb94-e5b7a1cacb03		\N		\N
\.


--
-- Data for Name: merchant_merchant_groups; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.merchant_merchant_groups (id, merchant_id, group_id) FROM stdin;
\.


--
-- Data for Name: merchant_merchant_user_permissions; Type: TABLE DATA; Schema: public; Owner: goliath
--

COPY public.merchant_merchant_user_permissions (id, merchant_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 33, true);


--
-- Name: captcha_captchastore_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.captcha_captchastore_id_seq', 17, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 16, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 11, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 17, true);


--
-- Name: inventory_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.inventory_brand_id_seq', 6, true);


--
-- Name: inventory_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.inventory_category_id_seq', 2, true);


--
-- Name: inventory_inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.inventory_inventory_id_seq', 8, true);


--
-- Name: inventory_merchandise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.inventory_merchandise_id_seq', 3, true);


--
-- Name: merchant_merchant_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.merchant_merchant_groups_id_seq', 1, false);


--
-- Name: merchant_merchant_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: goliath
--

SELECT pg_catalog.setval('public.merchant_merchant_user_permissions_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: captcha_captchastore captcha_captchastore_hashkey_key; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.captcha_captchastore
    ADD CONSTRAINT captcha_captchastore_hashkey_key UNIQUE (hashkey);


--
-- Name: captcha_captchastore captcha_captchastore_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.captcha_captchastore
    ADD CONSTRAINT captcha_captchastore_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: inventory_brand inventory_brand_brand_key; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_brand
    ADD CONSTRAINT inventory_brand_brand_key UNIQUE (brand);


--
-- Name: inventory_brand inventory_brand_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_brand
    ADD CONSTRAINT inventory_brand_pkey PRIMARY KEY (id);


--
-- Name: inventory_category inventory_category_category_key; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_category
    ADD CONSTRAINT inventory_category_category_key UNIQUE (category);


--
-- Name: inventory_category inventory_category_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_category
    ADD CONSTRAINT inventory_category_pkey PRIMARY KEY (id);


--
-- Name: inventory_inventory inventory_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_inventory
    ADD CONSTRAINT inventory_inventory_pkey PRIMARY KEY (id);


--
-- Name: inventory_merchandise inventory_merchandise_code_key; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_merchandise
    ADD CONSTRAINT inventory_merchandise_code_key UNIQUE (code);


--
-- Name: inventory_merchandise inventory_merchandise_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_merchandise
    ADD CONSTRAINT inventory_merchandise_pkey PRIMARY KEY (id);


--
-- Name: merchant_merchant_groups merchant_merchant_groups_merchant_id_group_id_0ad72951_uniq; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_groups
    ADD CONSTRAINT merchant_merchant_groups_merchant_id_group_id_0ad72951_uniq UNIQUE (merchant_id, group_id);


--
-- Name: merchant_merchant_groups merchant_merchant_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_groups
    ADD CONSTRAINT merchant_merchant_groups_pkey PRIMARY KEY (id);


--
-- Name: merchant_merchant merchant_merchant_mobile_key; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant
    ADD CONSTRAINT merchant_merchant_mobile_key UNIQUE (mobile);


--
-- Name: merchant_merchant merchant_merchant_name_key; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant
    ADD CONSTRAINT merchant_merchant_name_key UNIQUE (name);


--
-- Name: merchant_merchant merchant_merchant_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant
    ADD CONSTRAINT merchant_merchant_pkey PRIMARY KEY (id);


--
-- Name: merchant_merchant_user_permissions merchant_merchant_user_p_merchant_id_permission_i_74b58b3e_uniq; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_user_permissions
    ADD CONSTRAINT merchant_merchant_user_p_merchant_id_permission_i_74b58b3e_uniq UNIQUE (merchant_id, permission_id);


--
-- Name: merchant_merchant_user_permissions merchant_merchant_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_user_permissions
    ADD CONSTRAINT merchant_merchant_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: merchant_merchant merchant_merchant_username_key; Type: CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant
    ADD CONSTRAINT merchant_merchant_username_key UNIQUE (username);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: captcha_captchastore_hashkey_cbe8d15a_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX captcha_captchastore_hashkey_cbe8d15a_like ON public.captcha_captchastore USING btree (hashkey varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: inventory_brand_brand_467bd058_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX inventory_brand_brand_467bd058_like ON public.inventory_brand USING btree (brand varchar_pattern_ops);


--
-- Name: inventory_category_category_edc8a201_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX inventory_category_category_edc8a201_like ON public.inventory_category USING btree (category varchar_pattern_ops);


--
-- Name: inventory_inventory_merchandise_id_800549ed; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX inventory_inventory_merchandise_id_800549ed ON public.inventory_inventory USING btree (merchandise_id);


--
-- Name: inventory_inventory_merchant_id_cd7c7255; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX inventory_inventory_merchant_id_cd7c7255 ON public.inventory_inventory USING btree (merchant_id);


--
-- Name: inventory_merchandise_brand_id_0170d126; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX inventory_merchandise_brand_id_0170d126 ON public.inventory_merchandise USING btree (brand_id);


--
-- Name: inventory_merchandise_category_id_5caf25b2; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX inventory_merchandise_category_id_5caf25b2 ON public.inventory_merchandise USING btree (category_id);


--
-- Name: inventory_merchandise_code_1f4332bc_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX inventory_merchandise_code_1f4332bc_like ON public.inventory_merchandise USING btree (code varchar_pattern_ops);


--
-- Name: merchant_merchant_groups_group_id_fea34317; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX merchant_merchant_groups_group_id_fea34317 ON public.merchant_merchant_groups USING btree (group_id);


--
-- Name: merchant_merchant_groups_merchant_id_ec234588; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX merchant_merchant_groups_merchant_id_ec234588 ON public.merchant_merchant_groups USING btree (merchant_id);


--
-- Name: merchant_merchant_mobile_ba620f6a_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX merchant_merchant_mobile_ba620f6a_like ON public.merchant_merchant USING btree (mobile varchar_pattern_ops);


--
-- Name: merchant_merchant_name_1a50ab9c_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX merchant_merchant_name_1a50ab9c_like ON public.merchant_merchant USING btree (name varchar_pattern_ops);


--
-- Name: merchant_merchant_user_permissions_merchant_id_61d22d56; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX merchant_merchant_user_permissions_merchant_id_61d22d56 ON public.merchant_merchant_user_permissions USING btree (merchant_id);


--
-- Name: merchant_merchant_user_permissions_permission_id_b13b17f2; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX merchant_merchant_user_permissions_permission_id_b13b17f2 ON public.merchant_merchant_user_permissions USING btree (permission_id);


--
-- Name: merchant_merchant_username_123582a3_like; Type: INDEX; Schema: public; Owner: goliath
--

CREATE INDEX merchant_merchant_username_123582a3_like ON public.merchant_merchant USING btree (username varchar_pattern_ops);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_merchant_merchant_id; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_merchant_merchant_id FOREIGN KEY (user_id) REFERENCES public.merchant_merchant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: inventory_inventory inventory_inventory_merchandise_id_800549ed_fk_inventory; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_inventory
    ADD CONSTRAINT inventory_inventory_merchandise_id_800549ed_fk_inventory FOREIGN KEY (merchandise_id) REFERENCES public.inventory_merchandise(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: inventory_inventory inventory_inventory_merchant_id_cd7c7255_fk_merchant_; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_inventory
    ADD CONSTRAINT inventory_inventory_merchant_id_cd7c7255_fk_merchant_ FOREIGN KEY (merchant_id) REFERENCES public.merchant_merchant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: inventory_merchandise inventory_merchandis_category_id_5caf25b2_fk_inventory; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_merchandise
    ADD CONSTRAINT inventory_merchandis_category_id_5caf25b2_fk_inventory FOREIGN KEY (category_id) REFERENCES public.inventory_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: inventory_merchandise inventory_merchandise_brand_id_0170d126_fk_inventory_brand_id; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.inventory_merchandise
    ADD CONSTRAINT inventory_merchandise_brand_id_0170d126_fk_inventory_brand_id FOREIGN KEY (brand_id) REFERENCES public.inventory_brand(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: merchant_merchant_groups merchant_merchant_gr_merchant_id_ec234588_fk_merchant_; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_groups
    ADD CONSTRAINT merchant_merchant_gr_merchant_id_ec234588_fk_merchant_ FOREIGN KEY (merchant_id) REFERENCES public.merchant_merchant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: merchant_merchant_groups merchant_merchant_groups_group_id_fea34317_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_groups
    ADD CONSTRAINT merchant_merchant_groups_group_id_fea34317_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: merchant_merchant_user_permissions merchant_merchant_us_merchant_id_61d22d56_fk_merchant_; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_user_permissions
    ADD CONSTRAINT merchant_merchant_us_merchant_id_61d22d56_fk_merchant_ FOREIGN KEY (merchant_id) REFERENCES public.merchant_merchant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: merchant_merchant_user_permissions merchant_merchant_us_permission_id_b13b17f2_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: goliath
--

ALTER TABLE ONLY public.merchant_merchant_user_permissions
    ADD CONSTRAINT merchant_merchant_us_permission_id_b13b17f2_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

