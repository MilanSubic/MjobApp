package web.mjob.models.dto;

import lombok.Data;

@Data
public class KonverzacijaDto {
    private Long id;
    private String tema;
    private String korisnikIme;
    private String korisnikPrezime;
    private Long korisnikId;
    private Boolean procitana;

}
