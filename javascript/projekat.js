
window.addEventListener('load' , init)

let interval
let validator

function resetuj_input() {

    let id = document.getElementById('id')
    let ime_i_prezime = document.getElementById('ime_i_prezime')
    let godina_rodjenja = document.getElementById('godiste')
    let email = document.getElementById('email')
    let vrsta_clana = document.querySelector('input[name="vrsta_clana"]:checked')


    id.value = ''
    ime_i_prezime.value = ''
    godina_rodjenja.value = ''
    email.value = ''
    vrsta_clana.checked = false
}

function dodaj_u_input_update(clan) {
    let id = document.getElementById('id_update')
    let ime_i_prezime = document.getElementById('ime_i_prezime_update')
    let godina_rodjenja = document.getElementById('godiste_update')
    let email = document.getElementById('email_update')
    let vrsta_clana = document.getElementsByClassName('vrsta_clana')


    if(clan.vrsta_clana == 'regularni') {
        vrsta_clana[0].checked = true

    } else {
        vrsta_clana[1].checked = true
    }
    


    id.value = clan.ID
    ime_i_prezime.value = clan.ime_i_prezime
    godina_rodjenja.value = clan.godina_rodjenja
    email.value = clan.email
    
}

function prikazi_validaciju() {


    let div_validiranje = document.getElementById('validiranje')
    div_validiranje.classList.remove('sakrij')
    div_validiranje.classList.add('prikazi')

    let forma_div = document.getElementsByClassName('forma-div')[0]

    forma_div.classList.add('sakrij')

    return true
}

function sakrij_validaciju() {



    let div_validiranje = document.getElementById('validiranje')
    div_validiranje.classList.add('sakrij')
    div_validiranje.classList.remove('prikazi')

    let forma_div = document.getElementsByClassName('forma-div')[0]

    forma_div.classList.remove('sakrij')

    return true
}

let tajmer
let validacija_rezultat


function potvrdi(clan) {

    let validacija_greska = document.getElementById('pogresna_validacija')
    validacija_greska.classList.add('sakrij')

    let validacija_value = document.getElementById('validacija').value
    if (validacija_value == validacija_rezultat && validator == true) {

        clearTimeout(tajmer)
        let id = document.getElementById('id').value
        let ime_i_prezime = document.getElementById('ime_i_prezime').value
        let godina_rodjenja = document.getElementById('godiste').value
        let email = document.getElementById('email').value
        let vrsta_clana = Clan.vrednost_radio(0)
        let clanarina = Clan.cena_clanarine(vrsta_clana)

        let clan = new Clan(id,ime_i_prezime,godina_rodjenja,email,vrsta_clana,clanarina)



        let ime_kljuc = 'clan' + id

        localStorage.setItem(ime_kljuc , JSON.stringify(clan))
    
        brojac_id++

        resetuj_input()

        sakrij_validaciju()

        let validacija = document.getElementById('validacija')
        validacija.value = ''



        Clan.ucitaj_clanove_iz_localstorage()

        

        clan.ubaci_clana_u_tabelu()
        
    } else {
        let validacija_greska = document.getElementById('pogresna_validacija')
        validacija_greska.innerText = 'Pogresan rezultat'
        validacija_greska.classList.remove('sakrij')
    } 

    
    
}

let pomocna_lista = []
let trenutni_maks

function pronadji_vrednost_brojaca() {
    

    for (let key in localStorage) {


        if (key.startsWith("clan") || localStorage.getItem(key) === "clan") {

            let zadnji_string = key
            let zadnjiKarakter = zadnji_string.substring(4);

            zadnjiKarakter = parseInt(zadnjiKarakter)

            pomocna_lista.push(zadnjiKarakter)

        }

        trenutni_maks = pomocna_lista[0]

        for (let karakter of pomocna_lista) {
            if (karakter > trenutni_maks) {
                trenutni_maks = karakter
            }
        }
    }

    localStorage.setItem('brojac' , trenutni_maks)
    return trenutni_maks + 1
}

function azurirajPrikazTajmera(preostaloVreme) {
    const elementTekstaTajmera = document.getElementById('timer-text');
    elementTekstaTajmera.textContent = `${preostaloVreme}`;
}

function generisi_nasumicnu_operaciju() {
    let broj1 = Math.floor(Math.random() * 10) + 1;
    let broj2 = Math.floor(Math.random() * 10) + 1;

    let operacija = Math.floor(Math.random() * 4);
    
    if (broj1 < broj2) {
        broj2 = broj1
        broj1 = broj2
    }

    let rezultat;

    switch (operacija) {
        case 0:
            rezultat = broj1 + broj2;
            break;
        case 1:
            rezultat = broj1 - broj2;
            break;
        case 2:
            rezultat = broj1 * broj2;
            break;
        case 3:
            rezultat = Math.floor(broj1 / broj2);
            break;
        default:
            console.log('Nepoznata operacija');
    }

    if (operacija == 0) {
        operacija = '+'
    }
    else if (operacija == 1) {
        operacija = '-'
    }
    else if(operacija == 2) {
        operacija = '*'
    }
    else if(operacija == 3) {
        operacija = '/'
    }

    let label = document.getElementById('validiranje_operacija')
    label.innerText = ` ${broj1} ${operacija} ${broj2} `

    return rezultat
}


let brojac_id


let redovi_u_tabeli = []

class Clan {
    ID
    ime_i_prezime
    godina_rodjenja
    email
    vrsta_clana
    clanarina

    constructor(ID,ime_i_prezime,godina_rodjenja,email,vrsta_clana,clanarina){
        this.ID = ID
        this.ime_i_prezime = ime_i_prezime
        this.godina_rodjenja = godina_rodjenja
        this.email = email
        this.vrsta_clana = vrsta_clana
        this.clanarina = clanarina
    }

   

    static unesi_novog_clana_preko_forme(event) {

        event.preventDefault()
        
        validator = true

        validacija_rezultat = generisi_nasumicnu_operaciju()

        let greska_id = document.getElementById('greska_postoji_id')
        let greska_prazan_input = document.getElementById('greska_prazan_input')
        let greska_ime_prezime = document.getElementById('greska_ime_prezime')
        let greska_godiste = document.getElementById('greska_godiste')
        let greska_email = document.getElementById('greska_email')

        greska_id.classList.add('sakrij')
        greska_prazan_input.classList.add('sakrij')
        greska_ime_prezime.classList.add('sakrij')
        greska_godiste.classList.add('sakrij')
        greska_email.classList.add('sakrij')

        let id = document.getElementById('id').value
        let ime_i_prezime = document.getElementById('ime_i_prezime').value
        let godina_rodjenja = document.getElementById('godiste').value
        let email = document.getElementById('email').value


        let greska = ''

        Clan.ucitaj_clanove_iz_localstorage()


        for(let i = 0; i < clanovi.length ; i++) {
            if(clanovi[i].ID == id) {
                let greska_id = document.getElementById('greska_postoji_id')
                greska_id.innerText = 'Clan sa tim ID-em vec postoji'
                greska_id.classList.remove('sakrij')
                return
            }
        }


        if (id == '' ||ime_i_prezime.length == 0 || godina_rodjenja == null || email.length == 0) {
            greska = 'nisu popunjeni';
            let greska_prazan_input = document.getElementById('greska_prazan_input')
            greska_prazan_input.innerText = 'Sva polja moraju biti popunjena'
            greska_prazan_input.classList.remove('sakrij')
            return
        }

        if (!ime_i_prezime.includes(" ")) {
            let greska_ime_prezime = document.getElementById('greska_ime_prezime')
            greska_ime_prezime.innerText = 'Ime i prezime moraju da budu dve reci'
            greska_ime_prezime.classList.remove('sakrij')
            return
        }

        if(godina_rodjenja < 0 || godina_rodjenja > 2023 || godina_rodjenja < 1900) {
            let greska_godiste = document.getElementById('greska_godiste')
            greska_godiste.innerText = 'Neispravno uneta godina rodjenja'
            greska_godiste.classList.remove('sakrij')
            return
        }

        if (!email.includes("@")) {
            let greska_email = document.getElementById('greska_email')
            greska_email.innerText = 'Email mora da sadrzi @'
            greska_email.classList.remove('sakrij')
            return
        }
        
        if (greska == '') {
            prikazi_validaciju();
        
            let preostaloVreme = 30;

            tajmer = setTimeout(function azurirajTajmer() {
                preostaloVreme--;
        
                if (preostaloVreme >= 0) {
                azurirajPrikazTajmera(preostaloVreme);
                tajmer = setTimeout(azurirajTajmer, 1000);
                
                } else {
                validator = false;
        
                resetuj_input();
                sakrij_validaciju();
                }
        }, 1000);
    
        azurirajPrikazTajmera(preostaloVreme);
    
        return true;
        } else {
        return false;
        }
        
        
    }

    static cena_clanarine(vrsta_clana) {
        let clanarina
    
        if (vrsta_clana == 'regularni') {
            clanarina = 3000
        } else if (vrsta_clana == 'povlasceni') {
            clanarina = 3000 * 0.8
        }
    
        return clanarina
    }
    
    static vrednost_radio(indeks){
        let forma = document.getElementsByTagName("form")[indeks]

        let izabrani_radio = forma.querySelector('input[name="vrsta_clana"]:checked').value


        return izabrani_radio
    }

    static ucitaj_clanove_iz_localstorage() {
        clanovi = []
        for (var key in localStorage) {
            if (key.startsWith("clan") || localStorage.getItem(key) === "clan") {
                let clan_item = JSON.parse(localStorage.getItem(key))
    
                let clan
                clan = new Clan(clan_item.ID , clan_item.ime_i_prezime , clan_item.godina_rodjenja , clan_item.email , clan_item.vrsta_clana , clan_item.clanarina)
    
                clanovi.push(clan)
            }
        }
    }

    

    ubaci_clana_u_tabelu() {
        let tabela = document.getElementsByTagName('table')[0]

        let red = document.createElement('tr')

        let ID = document.createElement('td')
        ID.innerText = this.ID

        let ime_i_prezime = document.createElement('td')
        ime_i_prezime.innerText = this.ime_i_prezime

        let godiste = document.createElement('td')
        godiste.innerText = this.godina_rodjenja

        let email = document.createElement('td')
        email.innerText = this.email

        let vrsta_clana = document.createElement('td')
        vrsta_clana.innerText = this.vrsta_clana

        let clanarina = document.createElement('td')
        clanarina.innerText = this.clanarina

        let polje_obrisi = document.createElement('td')
        let dugme_obrisi = document.createElement('button')
        dugme_obrisi.innerText = 'Obrisi' 

        polje_obrisi.appendChild(dugme_obrisi)

        let polje_update = document.createElement('td')
        let dugme_update = document.createElement('button')
        dugme_update.innerText = 'Update' 

        polje_update.appendChild(dugme_update)

        
    

        dugme_obrisi.addEventListener('click', function() {
            let red_za_brisanje = this.parentNode.parentNode;
            red_za_brisanje.remove();

            let id = ID.innerText


            let ime_kljuc = 'clan' + id


            localStorage.removeItem(ime_kljuc)
        });

        dugme_update.addEventListener('click', function() {
            let update_forma_div = document.getElementById('forma_update_div')
            let ubaci_clana_forma_div = document.getElementById('forma_ubaci_clana_div')

            update_forma_div.classList.remove('sakrij')

            ubaci_clana_forma_div.classList.add('sakrij')


            let id = ID.innerText

            let ime_kljuc = 'clan' + id


            let clan_item = JSON.parse(localStorage.getItem(ime_kljuc))

            let clan_update
            clan_update = new Clan(id , clan_item.ime_i_prezime , clan_item.godina_rodjenja , clan_item.email , clan_item.vrsta_clana , clan_item.clanarina)

            dodaj_u_input_update(clan_item)

        });

        


        red.append(ID,ime_i_prezime,godiste,email,vrsta_clana,clanarina,polje_obrisi,polje_update)
        
        redovi_u_tabeli.push(red)

        for (const red of redovi_u_tabeli) {
            tabela.appendChild(red)
        }

        
    }

    static ubaci_vise_clanova_u_tabelu(clanovi) {
        for (let i = 0; i < clanovi.length; i++) {
            clanovi[i].ubaci_clana_u_tabelu()
            

            
        }

        
        
    }

    static update_clana(event) {
        event.preventDefault()
        
        let greska_prazan_input = document.getElementById('greska_prazan_input_update')
        let greska_ime_prezime = document.getElementById('greska_ime_prezime_update')
        let greska_godiste = document.getElementById('greska_godiste_update')
        let greska_email = document.getElementById('greska_email_update')

        greska_prazan_input.classList.add('sakrij')
        greska_ime_prezime.classList.add('sakrij')
        greska_godiste.classList.add('sakrij')
        greska_email.classList.add('sakrij')

        let id = document.getElementById('id').value
        let ime_i_prezime = document.getElementById('ime_i_prezime_update').value
        let godina_rodjenja = document.getElementById('godiste_update').value
        let email = document.getElementById('email_update').value
        let vrsta_clana = Clan.vrednost_radio(1)
        let clanarina = Clan.cena_clanarine(vrsta_clana)
    
        let clan_update = new Clan(id,ime_i_prezime,godina_rodjenja,email,vrsta_clana,clanarina)
        
        if (id == null ||ime_i_prezime.length == 0 || godina_rodjenja == null || email.length == 0) {
            greska = 'nisu popunjeni';
            let greska_prazan_input = document.getElementById('greska_prazan_input_update')
            greska_prazan_input.innerText = 'Sva polja moraju biti popunjena'
            greska_prazan_input.classList.remove('sakrij')
            return
        }

        if (!ime_i_prezime.includes(" ")) {
            let greska_ime_prezime = document.getElementById('greska_ime_prezime_update')
            greska_ime_prezime.innerText = 'Ime i prezime moraju da budu dve reci'
            greska_ime_prezime.classList.remove('sakrij')
            return
        }

        if(godina_rodjenja < 0 || godina_rodjenja > 2023 || godina_rodjenja < 1900) {
            let greska_godiste = document.getElementById('greska_godiste_update')
            greska_godiste.innerText = 'Neispravno uneta godina rodjenja'
            greska_godiste.classList.remove('sakrij')
            return
        }

        if (!email.includes("@")) {
            let greska_email = document.getElementById('greska_email_update')
            greska_email.innerText = 'Email mora da sadrzi @'
            greska_email.classList.remove('sakrij')
            return
        }


        let ime_kljuc = 'clan' + id
    
        localStorage.setItem(ime_kljuc , JSON.stringify(clan_update))

        
        let tabela = document.getElementsByTagName('table')

        let redovi = document.getElementsByTagName('tr')

        

        for (let i = 1; i < redovi.length; i++) {

            let sadrzaj = redovi[i].getElementsByTagName('td') 
            let id_red = sadrzaj[0].innerText



            if(id == id_red) {
                sadrzaj[1].innerText = ime_i_prezime
                sadrzaj[2].innerText = godina_rodjenja
                sadrzaj[3].innerText = email
                sadrzaj[4].innerText = vrsta_clana
                sadrzaj[5].innerText = clanarina
            }
            
            
        }

        

        id = document.getElementById('id')
        ime_i_prezime = document.getElementById('ime_i_prezime_update')
        godina_rodjenja = document.getElementById('godiste_update')
        email = document.getElementById('email_update')
        vrsta_clana = document.querySelector('input[name="vrsta_clana"]:checked')

        id.value = ''
        ime_i_prezime.value = ''
        godina_rodjenja.value = ''
        email.value = ''
        vrsta_clana.checked = false

    }

    
    
}
let dugme_obrisi = document.createElement('button')


let clan1 = new Clan(1,'Andrija Racic',2003,'aracic@raf.rs' , 'regularni' , 3000)
let clan2 = new Clan(2,'Pera Peric',2000,'pperic@raf.rs' , 'povlasceni' , 2400)
let clan3 = new Clan(3,'Mika Mikic',2001,'mmikic@raf.rs' , 'regularni' , 3000)

let clanovi = []



function init() {
    localStorage.setItem('clan1' , JSON.stringify(clan1))
    localStorage.setItem('clan2' , JSON.stringify(clan2))
    localStorage.setItem('clan3' , JSON.stringify(clan3))

    generisi_nasumicnu_operaciju()

    brojac_id = pronadji_vrednost_brojaca()

    let dugme_potvrdi = document.getElementsByTagName('button')[0]
    
    let dugme_napravi = document.getElementsByTagName('button')[1]

    let dugme_update_u_localstorage = document.getElementsByTagName('button')[2]
    
    dugme_napravi.addEventListener('click', Clan.unesi_novog_clana_preko_forme)

    dugme_potvrdi.addEventListener('click' , potvrdi)

    dugme_update_u_localstorage.addEventListener('click' , Clan.update_clana)

    


    Clan.ucitaj_clanove_iz_localstorage()


    Clan.ubaci_vise_clanova_u_tabelu(clanovi)
    

    
    
}