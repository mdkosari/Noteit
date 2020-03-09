package com.armiyoon.noteit.view.main;

import com.armiyoon.noteit.model.database.Table.ArticleTable;
import com.armiyoon.noteit.model.database.Table.NoteTable;

import java.util.List;

public interface IDashboardView {

    void receiveAllArticle(List<ArticleTable> articles);

    void receiveTemp(List<NoteTable> notes);

    void receiveTrashArticle(List<ArticleTable> trashs);

    void receiveTrashNote(List<NoteTable> trashes);

}
