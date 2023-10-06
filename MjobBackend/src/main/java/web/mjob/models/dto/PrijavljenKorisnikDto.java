package web.mjob.models.dto;

import lombok.Data;

import javax.persistence.Id;

@Data
public class PrijavljenKorisnikDto {
    @Id
    private Long id;
    private Korisnik korisnikByKorisnikId;
    private Oglas oglasByOglasId;
    private boolean prijavljen;
    private boolean odobren;
    private boolean odbijen;
    private boolean odjavljen;
    private Boolean uplata;
}
