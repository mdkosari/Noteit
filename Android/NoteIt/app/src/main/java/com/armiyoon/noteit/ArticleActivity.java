package com.armiyoon.noteit;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.system.Os;
import android.view.View;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

public class ArticleActivity extends AppCompatActivity implements View.OnClickListener {

    private LinearLayout llOption;
    private TextView tvDate,tvNew,tvClip,tvFile;
    private ImageView imgBack,imgSearch,imgOption;
    private ListView lvNotes;
    private RecyclerView rvNote;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_article);
        initial();
    }

    private void initial(){
        imgBack=findViewById(R.id.img_back_article);
        imgSearch=findViewById(R.id.img_article_search);
        imgOption=findViewById(R.id.img_article_option_open_close);
        tvNew=findViewById(R.id.tv_article_node_new);
        tvClip=findViewById(R.id.tv_article_node_clipboard);
        tvFile=findViewById(R.id.tv_article_node_file);
        imgBack.setOnClickListener(this);
        imgSearch.setOnClickListener(this);
        imgOption.setOnClickListener(this);
        tvNew.setOnClickListener(this);
        tvClip.setOnClickListener(this);
        tvFile.setOnClickListener(this);

        llOption=findViewById(R.id.ll_article_option);

    }


    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.img_back_article:
                startActivity(new Intent(ArticleActivity.this,DashboardActivity.class));
                finish();
                break;
            case R.id.img_article_search:
                break;
            case R.id.img_article_option_open_close:
                if(llOption.getVisibility()==View.VISIBLE)
                    optionClose();
                else
                    optionOpen();
                break;
            case R.id.tv_article_node_new:
                break;
            case R.id.tv_article_node_clipboard:
                break;
            case R.id.tv_article_node_file:
                break;
        }
    }


    void optionOpen(){
        llOption.setAnimation(AnimationUtils.loadAnimation(this,R.anim.menu_option_fade_in));
        llOption.setVisibility(View.VISIBLE);
    }

    void optionClose(){
        llOption.setAnimation(AnimationUtils.loadAnimation(this,R.anim.menu_option_fade_out));
        llOption.setVisibility(View.GONE);
    }
}
