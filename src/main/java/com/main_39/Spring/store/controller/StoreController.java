package com.main_39.Spring.store.controller;

import com.main_39.Spring.dto.MultiResponseDto;
import com.main_39.Spring.dto.SingleResponseDto;
import com.main_39.Spring.member.entity.Local;
import com.main_39.Spring.member.service.MemberService;
import com.main_39.Spring.store.dto.StorePatchDto;
import com.main_39.Spring.store.dto.StorePostDto;
import com.main_39.Spring.store.dto.StoreResponseDto;
import com.main_39.Spring.store.entity.Store;
import com.main_39.Spring.store.mapper.StoreMapper;
import com.main_39.Spring.store.service.StoreService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
public class StoreController {
    private final StoreService storeService;
    private final StoreMapper mapper;

    private final MemberService memberService;

    public StoreController(StoreService storeService,
                           StoreMapper mapper,
                           MemberService memberService) {
        this.storeService = storeService;
        this.mapper = mapper;
        this.memberService = memberService;
    }

    /**
     * 푸드트럭 등록
     */
    @PostMapping("/store/ask")
    public ResponseEntity postStore(@Valid @RequestBody StorePostDto storePostDto) {

        Store store = mapper.storePostDtoToStore(storePostDto);
        System.out.println("회원 아이디 : " + storePostDto.getLocalId());
        System.out.println("가게 타입 : " + store.getStoreType());
        Local local = memberService.findVerifiedLocal(storePostDto.getLocalId());
        store.setLocal(local);

        Store posted = storeService.createdStore(store);

        StoreResponseDto response = mapper.storeToStoreResponseDto(posted);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 푸드트럭 수정
     */
    @PatchMapping("/store/{store-id}")
    public ResponseEntity patchStore(
            @PathVariable("store-id") @Positive long storeId,
            @Valid @RequestBody StorePatchDto storePatchDto) {

        storePatchDto.setStoreId(storeId);

        Store response =
                storeService.updateStore(mapper.storePatchDtoToStore(storePatchDto));

        return  new ResponseEntity<>(
                new SingleResponseDto<>(mapper.storeToStoreResponseDto(response)),
                HttpStatus.OK);
    }

    /**
     * 특정 푸드트럭 불러오기
     */
    @GetMapping("/store/{store-id}")
    public ResponseEntity getStore(@PathVariable("store-id") @Positive long storeId) {

        Store store = storeService.findStore(storeId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.storeToStoreResponseDto(store)), HttpStatus.OK);
    }

    /**
     * 푸드트럭 목록 불러오기
     */
    @GetMapping("/store")
    public ResponseEntity getStores(@Positive @RequestParam int page,
                                    @Positive @RequestParam(required = false, defaultValue = "15") int size,
                                    @RequestParam Store.StoreType type){
        Page<Store> pageStores;

        if(type!= Store.StoreType.all) {
            pageStores = storeService.findByStoreType(type, page -1, size);
        } else {
            pageStores = storeService.findStores(page -1, size);
        }
        List<Store> stores = pageStores.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.storesToStoreResponseDtos(stores),
                        pageStores),
                HttpStatus.OK);
    }

    /**
     * 푸드트럭 삭제
     */
    @DeleteMapping("/store/{store-id}")
    public ResponseEntity deleteStore(
            @PathVariable("store-id") @Positive long storeId) {
        System.out.println("#delete Store");
        storeService.deleteStore(storeId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}