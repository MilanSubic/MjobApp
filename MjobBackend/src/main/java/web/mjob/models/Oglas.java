package web.mjob.models;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import web.mjob.models.entities.KorisnikPrijavljenEntity;
import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;
import web.mjob.models.entities.PosaoTipEntity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

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
    private Integer posaoTipId;
    private Integer novcanaNaknadaTipId;
    private Integer narucilacId;
    private List<KorisnikPrijavljenEntity> korisnikPrijavljensById;
    private PosaoTipEntity posaoTipByPosaoTipId;
    private NovcanaNaknadaTipEntity novcanaNaknadaTipByNovcanaNaknadaTipId;
    private NarucilacEntity narucilacByNarucilacId;


    public Oglas(){

    }

    public Oglas(Long id, String sadrzaj, String mjesto, String napomena, Timestamp datum, Integer brojLjudi, Timestamp aktivanDo, BigDecimal satnica, Boolean javni, Integer posaoTipId, Integer novcanaNaknadaTipId, Integer narucilacId, List<KorisnikPrijavljenEntity> korisnikPrijavljensById, PosaoTipEntity posaoTipByPosaoTipId, NovcanaNaknadaTipEntity novcanaNaknadaTipByNovcanaNaknadaTipId, NarucilacEntity narucilacByNarucilacId) {
        this.id = id;
        this.sadrzaj = sadrzaj;
        this.mjesto = mjesto;
        this.napomena = napomena;
        this.datum = datum;
        this.brojLjudi = brojLjudi;
        this.aktivanDo = aktivanDo;
        this.satnica = satnica;
        this.javni = javni;
        this.posaoTipId = posaoTipId;
        this.novcanaNaknadaTipId = novcanaNaknadaTipId;
        this.narucilacId = narucilacId;
        this.korisnikPrijavljensById = korisnikPrijavljensById;
        this.posaoTipByPosaoTipId = posaoTipByPosaoTipId;
        this.novcanaNaknadaTipByNovcanaNaknadaTipId = novcanaNaknadaTipByNovcanaNaknadaTipId;
        this.narucilacByNarucilacId = narucilacByNarucilacId;
    }
}
