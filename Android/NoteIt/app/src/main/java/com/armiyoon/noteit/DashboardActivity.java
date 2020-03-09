package com.armiyoon.noteit;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.drawable.GradientDrawable;
import android.icu.lang.UCharacter;
import android.os.Build;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;

import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.ListView;
import android.widget.RelativeLayout;

import com.armiyoon.noteit.model.database.Table.ArticleTable;
import com.armiyoon.noteit.model.database.Table.NoteTable;
import com.armiyoon.noteit.view.main.IDashboardView;

import java.util.List;

public class DashboardActivity extends AppCompatActivity implements IDashboardView , View.OnClickListener {


    private ImageView imgMenuOpener,imgSearch,imgPopup,imgMenuClose,imgOptionOpener,imgOptionCloser;
    private LinearLayout llMenu,llMain,llArticles,llFav,llLibrary,llShare,llSetting,llTrash,llArchive,llHelp,llToolbar,llMainInner,llOption;
    private RelativeLayout rlToolbar;
    private EditText etSearchTitle;
    private ListView lvArticles;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        initComponent();
    }


    private void initComponent(){

        imgMenuOpener=findViewById(R.id.img_toolbar_menu_opener);
        imgMenuOpener.setOnClickListener(this);
        imgSearch=findViewById(R.id.img_toolbar_menu_search);
        imgSearch.setOnClickListener(this);
        imgPopup=findViewById(R.id.img_toolbar_menuPopup);
        imgPopup.setOnClickListener(this);
        imgMenuClose=findViewById(R.id.img_menu_close);
        imgMenuClose.setOnClickListener(this);
        imgOptionOpener=findViewById(R.id.img_dashboard_option_opener);
        imgOptionOpener.setOnClickListener(this);
        imgOptionCloser=findViewById(R.id.img_dashboard_option_closer);
        imgOptionCloser.setOnClickListener(this);

        llMain=findViewById(R.id.ll_main_dashboard);
        llMenu=findViewById(R.id.ll_menu);
        llToolbar=findViewById(R.id.ll_dashboard_toolbar);
        llArticles=findViewById(R.id.ll_menu_item_article);
        llFav=findViewById(R.id.ll_menu_item_fav);
        llLibrary=findViewById(R.id.ll_menu_item_library);
        llShare=findViewById(R.id.ll_menu_item_share);
        llSetting=findViewById(R.id.ll_menu_item_setting);
        llArchive=findViewById(R.id.ll_menu_item_archive);
        llTrash=findViewById(R.id.ll_menu_item_trash);
        llHelp=findViewById(R.id.ll_menu_item_hellp);
        llMainInner=findViewById(R.id.ll_menu_inner_main);
        llOption=findViewById(R.id.ll_dashboard_option);
    }



    @Override
    public void receiveAllArticle(List<ArticleTable> articles) {

    }

    @Override
    public void receiveTemp(List<NoteTable> notes) {

    }

    @Override
    public void receiveTrashArticle(List<ArticleTable> trashes) {

    }

    @Override
    public void receiveTrashNote(List<NoteTable> trashes) {

    }


    @Override
    public void onClick(View v) {

        switch (v.getId()){
            case R.id.img_toolbar_menu_opener:
                menuOpener();
                break;
            case R.id.img_menu_close:
                menuClose();
                break;
            case R.id.img_dashboard_option_opener:
                optionOpener();
                break;
            case R.id.img_dashboard_option_closer:
                optionCloser();
                break;
            case R.id.img_toolbar_menu_search:
                startActivity(new Intent(DashboardActivity.this,ArticleActivity.class));
                break;

        }

    }

    private void menuOpener(){
        llOption.setVisibility(View.GONE);
        imgOptionOpener.setVisibility(View.GONE);
        llMain.setAnimation(AnimationUtils.loadAnimation(this, R.anim.main_fade_in));
        llMainInner.setVisibility(View.GONE);
        llMenu.setVisibility(View.VISIBLE);
        llMain.setVisibility(View.GONE);
        new CountDownTimer(400,100){

            @Override
            public void onTick(long millisUntilFinished) {

            }

            @Override
            public void onFinish() {
                llMainInner.setVisibility(View.VISIBLE);
            }
        }.start();

    }

    private void menuClose(){
        llMain.setAnimation(AnimationUtils.loadAnimation(this, R.anim.main_fade_out));
        llMain.setVisibility(View.VISIBLE);
        llMainInner.setVisibility(View.GONE);
        llMenu.setVisibility(View.GONE);
//        imgOptionOpener.setVisibility(View.VISIBLE);
        new CountDownTimer(400,100){
            @Override
            public void onTick(long millisUntilFinished) { }

            @Override
            public void onFinish() {
                imgOptionOpener.setVisibility(View.VISIBLE);
            }
        }.start();
    }

    private void optionOpener(){
        llOption.setAnimation(AnimationUtils.loadAnimation(this,R.anim.menu_option_fade_in));
        llOption.setVisibility(View.VISIBLE);
        imgOptionOpener.setVisibility(View.GONE);
    }

    private void optionCloser(){
        llOption.setAnimation(AnimationUtils.loadAnimation(this,R.anim.menu_option_fade_out));
        llOption.setVisibility(View.GONE);

        new CountDownTimer(800,100){
            @Override
            public void onTick(long millisUntilFinished) { }

            @Override
            public void onFinish() {
                imgOptionOpener.setVisibility(View.VISIBLE);
            }
        }.start();

    }
}
