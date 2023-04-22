package web.mjob.services;

import web.mjob.exceptions.ConflictException;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.RegistracijaDto;

public interface RegistracijaService {
    boolean signup(RegistracijaDto korisnik) throws ConflictException;
}
