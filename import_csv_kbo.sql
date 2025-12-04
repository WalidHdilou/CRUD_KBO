
CREATE TABLE entreprise (
    enterprise_number      VARCHAR(50) PRIMARY KEY,
    status                 VARCHAR(50),
    juridical_situation    VARCHAR(50),
    type_of_enterprise     VARCHAR(50),
    juridical_form         VARCHAR(50),
    juridical_form_cac     VARCHAR(50),
    start_date             DATE
);


CREATE TABLE establishment (
    establishment_number   VARCHAR(50) PRIMARY KEY,
    start_date             DATE,
    enterprise_number      VARCHAR(50) NOT NULL,
    CONSTRAINT fk_estab_enterprise
        FOREIGN KEY (enterprise_number)
        REFERENCES entreprise(enterprise_number)
);


CREATE TABLE activity (
    entity_number   VARCHAR(50) NOT NULL,
    activity_group  VARCHAR(50),
    nace_version    VARCHAR(50),
    nace_code       VARCHAR(50),
    classification  VARCHAR(50),

    CONSTRAINT fk_activity_enterprise
        FOREIGN KEY (entity_number)
        REFERENCES entreprise(enterprise_number)
);


CREATE TABLE address (
    entity_number        VARCHAR(50) NOT NULL,
    type_of_address      VARCHAR(50),
    country_nl           VARCHAR(500),
    country_fr           VARCHAR(500),
    zipcode              VARCHAR(50),
    municipality_nl      VARCHAR(500),
    municipality_fr      VARCHAR(500),
    street_nl            VARCHAR(50),
    street_fr            VARCHAR(50),
    house_number         VARCHAR(50),
    box                  VARCHAR(50),
    extra_address_info   VARCHAR(50),
    date_striking_off    DATE,
    CONSTRAINT fk_address_enterprise
        FOREIGN KEY (entity_number)
        REFERENCES entreprise(enterprise_number)
);


CREATE TABLE branch (
    id               VARCHAR(50) PRIMARY KEY,
    start_date       DATE,
    enterprise_number VARCHAR(50) NOT NULL,
    CONSTRAINT fk_branch_enterprise
        FOREIGN KEY (enterprise_number)
        REFERENCES entreprise(enterprise_number)
);

CREATE TABLE code (
    category     VARCHAR(50) NOT NULL,
    code         VARCHAR(50) NOT NULL,
    language     VARCHAR(50)  NOT NULL,
    description  TEXT,
    CONSTRAINT pk_code PRIMARY KEY (category, code, language)
);


CREATE TABLE contact (
    entity_number   VARCHAR(50) NOT NULL,
    entity_contact  VARCHAR(50),
    contact_type    VARCHAR(50),
    value           TEXT,
    CONSTRAINT fk_contact_enterprise
        FOREIGN KEY (entity_number)
        REFERENCES entreprise(enterprise_number)
);


CREATE TABLE denomination (
    entity_number        VARCHAR(50) NOT NULL,
    language             VARCHAR(50),
    type_of_denomination VARCHAR(50),
    denomination         TEXT,
    CONSTRAINT fk_denom_enterprise
        FOREIGN KEY (entity_number)
        REFERENCES entreprise(enterprise_number)
);


CREATE TABLE meta (
    snapshot_info
    variable  VARCHAR(50) PRIMARY KEY,
    value     VARCHAR(50)
);
