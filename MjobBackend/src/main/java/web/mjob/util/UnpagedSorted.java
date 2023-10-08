package web.mjob.util;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

public class UnpagedSorted implements Pageable {
    private final Sort sort;

    public UnpagedSorted(Sort sort) {
        this.sort = sort;
    }

    public boolean isPaged() {
        return false;
    }

    @Override
    public boolean isUnpaged() {
        return true;
    }

    public Pageable previousOrFirst() {
        return this;
    }

    public Pageable next() {
        return this;
    }

    public boolean hasPrevious() {
        return false;
    }

    @Override
    public Optional<Pageable> toOptional() {
        return Pageable.super.toOptional();
    }

    public Sort getSort() {
        return sort;
    }

    @Override
    public Sort getSortOr(Sort sort) {
        return Pageable.super.getSortOr(sort);
    }

    public int getPageSize() {
        throw new UnsupportedOperationException();
    }

    public int getPageNumber() {
        throw new UnsupportedOperationException();
    }

    public long getOffset() {
        throw new UnsupportedOperationException();
    }

    public Pageable first() {
        return this;
    }

    @Override
    public Pageable withPage(int pageNumber) {
        return this;
    }
}
