package web.mjob.base;


import lombok.Getter;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.NotFoundException;
import org.springframework.data.domain.Page;


import java.io.Serializable;
import java.util.List;

@Getter
public abstract class CrudController<ID extends Serializable,REQ,RESP> {
    private final Class<RESP> respClass;
    private final CrudService<ID> crudService;

    public CrudController(Class<RESP> respClass, CrudService<ID> crudService) {
        this.respClass = respClass;
        this.crudService = crudService;
    }

      @GetMapping("lista")
    List<RESP> findAll() throws NotFoundException {
        return crudService.findAll((respClass));
    }

    @GetMapping
    Page<RESP> findAll(Pageable page) throws NotFoundException {
        return crudService.findAll(page,respClass);
    }

    @GetMapping("/{id}")
    public RESP findById(@PathVariable ID id) throws NotFoundException {
        return crudService.findById(id, respClass);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable ID id) throws NotFoundException {
        crudService.delete(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RESP insert(@RequestBody REQ object) throws NotFoundException {
        return crudService.insert(object, respClass, SecurityContextHolder.getContext().getAuthentication());
    }

    @PutMapping("/{id}")
    public RESP update(@PathVariable ID id, @RequestBody REQ object) throws NotFoundException {
        return crudService.update(id, object, respClass);
    }
}
