package web.mjob.models.dto;

import lombok.Data;
import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;
import web.mjob.models.entities.PosaoTipEntity;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class Oglas {
    private Long id;
    private String sadrzaj;
    private String mjesto;
    private String napomena;
    private Timestamp datum;
    private Integer brojLjudi;
    private Timestamp aktivanDo;
    private BigDecimal satnica;
    private Boolean javni;
    private String posaoTipNaziv;
    private String novcanaNaknadaTipNaziv;
    private String narucilacNaziv;

}
