package com.main_39.Spring.menu.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.main_39.Spring.exception.BusinessLogicException;
import com.main_39.Spring.exception.ExceptionCode;
import com.main_39.Spring.menu.dto.MenuRequest;
import com.main_39.Spring.menu.entity.Menu;
import com.main_39.Spring.menu.repository.MenuRepository;
import com.main_39.Spring.store.entity.Store;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MenuService {

    private final MenuRepository menuRepository;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * 메뉴 등록하기
     */
    public void createMenu(Menu menu) {
        if(menu.getImage() != null) saveImageToS3(menu);
        menuRepository.save(menu);
    }

    /**
     * 메뉴 수정하기
     */
    public void updateMenu(long menuId, MenuRequest requestDto) {
        Menu updateMenu = findVerifiedMenu(menuId);

        Optional.ofNullable(requestDto.getName())
                .ifPresent(updateMenu::addName);
        Optional.of(requestDto.getPrice())
                .ifPresent(updateMenu::addPrice);
        Optional.ofNullable(requestDto.getImage())
                .ifPresent(image -> {updateMenu.addImage(image);
                                    saveImageToS3(updateMenu);});
        Optional.ofNullable(requestDto.getContent())
                .ifPresent(updateMenu::addContent);

        menuRepository.save(updateMenu);
    }

    private void saveImageToS3(Menu menu){
        String data;
        try{
            data = menu.getImage().split(",")[1];
        }catch(ArrayIndexOutOfBoundsException e){
            System.out.println("메뉴 이미지 수정 실패");
            throw new BusinessLogicException(ExceptionCode.MENU_PATCH_WRONG_ACCESS);
        }
        String s3FileName = "menu/" + menu.getStore().getStoreId() + "/" + menu.getName();
        byte[] decodeByte = Base64.getDecoder().decode(data);
        InputStream inputStream = new ByteArrayInputStream(decodeByte);
        ObjectMetadata objectMetadata = new ObjectMetadata();

        try {
            objectMetadata.setContentLength(inputStream.available());
        } catch (IOException e) {
            System.out.println("메뉴 이미지 수정 실패");
            throw new BusinessLogicException(ExceptionCode.MENU_PATCH_WRONG_ACCESS);
        }

        amazonS3.putObject(bucket,s3FileName,inputStream,objectMetadata);
        menu.addImage(amazonS3.getUrl(bucket,s3FileName).toString());
    }

    /**
     * 메뉴 삭제하기
     */
    @Transactional
    public void deleteMenu(Store store, long menuId) {

        Menu deleteMenu = findVerifiedMenu(menuId);

        if(store.hasMenu()) {
            store.getMenus().removeIf(menus -> menus.getMenuId().equals(menuId));
            menuRepository.deleteById(menuId);
        }

        if(deleteMenu.getImage() != null){
            int index = deleteMenu.getImage().indexOf("/",8);
            String key = deleteMenu.getImage().substring(index+1);

            amazonS3.deleteObject(bucket,key);
        }
    }

    /**
     * 단일 메뉴 찾기
     */
    public Menu findVerifiedMenu(long menuId) {

        return menuRepository.findById(menuId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MENU_NOT_EXISTS));
    }
}
