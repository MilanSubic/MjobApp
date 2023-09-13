package web.mjob.models.dto;

import lombok.Data;

import javax.persistence.Id;

@Data
public class PrijavljenKorisnikDto {
    @Id
    private Long id;
    private Korisnik korisnikByKorisnikId;
    private Oglas oglasByOglasId;
    private boolean odobren;
}
