export interface infoPagina {
    titulo?: string;
    cat1?: Cat1;
    cat2?: Cat2;
    cat3?: Cat3;
    info?: Info;
    notification?: Notification;
    MSM?: Notification;
    footer?: Footer;
}

interface Footer {
    titulo?: string;
    url?: string;
}

interface Notification {
    info?: string;
    item1?: string;
    item2?: string;
    item3?: string;
    item4?: string;
}

interface Info {
    titulo?: string;
    cuerpo?: string;
    path?: string;
}

interface Cat3 {
    titulo?: string;
    item1?: string;
    item2?: string;
}

interface Cat2 {
    titulo?: string;
    item1?: string;
    item2?: string;
    item3?: string;
}

interface Cat1 {
    titulo?: string;
    item1?: string;
    item2?: string;
    item3?: string;
    item4?: string;
    item5?: string;
}