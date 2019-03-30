/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import E from 'wangeditor';
import xss from 'xss';
import {
    Icon, Button, Input, Modal, message, Select
} from 'antd';
import myFetch from '../../utils/myFetch';

const { Option } = Select;

class BoxNote extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            note: {},
            visible: false,
            confirmLoading: false,
            taglist: [],
            selectedTag: []
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.submitNote = this.submitNote.bind(this);
        this.submitNoteTag = this.submitNoteTag.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.emitEmptyBook = this.emitEmptyBook.bind(this);
        this.emitEmptyTitle = this.emitEmptyTitle.bind(this);
    }

    componentDidMount() {
        let that = this;
        const elem1 = this.refs.editorContent;
        this.eContent = new E(elem1);
        const elem2 = this.refs.editorIdea;
        this.eIdea = new E(elem2);
        this.eContent.customConfig.zIndex = 100;
        let menu = [
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'table', // 表格
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ];
        this.eContent.customConfig.menus = menu;
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.eContent.customConfig.onchange = html => {
            this.setState({
                content: html
            });
        };
        this.eIdea.customConfig.zIndex = 100;
        this.eIdea.customConfig.menus = menu;
        this.eIdea.customConfig.onchange = html => {
            this.setState({
                idea: html
            });
        };
        this.eContent.create();
        this.eIdea.create();
        const { match } = this.props;

        myFetch.GET('note/shownote/' + match.params.noteid)
            .then((response) => {
                if (response.code === '0') {
                    let { note } = response.data;
                    that.setState({
                        note
                    });
                    this.eContent.txt.html(note.content);
                    this.eIdea.txt.html(note.idea);
                } else {
                    message.error(response.msg);
                }
            });
        if (match.params.type === 'box') {
            myFetch.GET('tag/search?keyword=')
                .then((response) => {
                    if (response.code === '0') {
                        let { taglist } = response.data;
                        that.setState({
                            taglist
                        });
                    } else {
                        message.error(response.msg);
                    }
                });
        }
    }

    // 清空标题内容
    emitEmptyTitle() {
        this.titleInput.focus();
        this.setState({ title: '' });
    }

    // 清空相关书名内容
    emitEmptyBook() {
        this.bookInput.focus();
        this.setState({ bookname: '' });
    }

    // 将输入值绑定在state上
    onChangeValue(e, type) {
        const val = e.target.value;
        this.setState(prev => ({ note: Object.assign({}, prev.note, { [type]: val }) }));
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    submitNote() {
        const { note } = this.state;
        const { bookname, title, noteid } = note;
        if (!title || title.length === 0) {
            message.error('标题不能为空！');
        }
        let data = {
            bookName: xss(bookname),
            content: xss(this.eContent.txt.html()),
            idea: xss(this.eIdea.txt.html()),
            title: xss(title),
            noteId: noteid
        };
        myFetch.POST('note/boxnote', data)
            .then((response) => {
                if (response.code === '0') {
                    message.success('成功！');
                    window.location.href = '/#/personal';
                } else {
                    message.error(response.msg);
                }
            });
    }

    submitNoteTag() {
        let that = this;
        const { note, selectedTag } = this.state;
        const { noteid } = note;
        if (selectedTag.length === 0) {
            message.error('请至少选择一个标签！');
            return;
        }
        if (selectedTag.length > 3) {
            message.error('标签数量不能超过3个！');
            return;
        }
        let tag = {
            noteid,
            tagid: selectedTag
        };
        myFetch.POST('note/notetag', tag)
            .then((response) => {
                if (response.code === '0') {
                    message.success('发表成功！');
                    that.setState({
                        visible: false,
                        confirmLoading: false
                    });
                    window.location.href = '/#/personal';
                } else {
                    message.error(response.msg);
                }
            });
    }

    // 提交笔记
    handleOk() {
        let that = this;
        const { note } = this.state;
        const { bookname, title, noteid } = note;
        if (!title || title.length === 0) {
            message.error('标题不能为空！');
        }
        let data = {
            bookName: xss(bookname),
            content: xss(this.eContent.txt.html()),
            idea: xss(this.eIdea.txt.html()),
            title: xss(title),
            publishTime: (new Date()).getTime(),
            noteId: noteid
        };
        myFetch.POST('note/boxnote', data)
            .then((response) => {
                if (response.code === '0') {
                    that.submitNoteTag(noteid);
                } else {
                    message.error(response.msg);
                }
            });
    }

    // 取消，关闭模态框
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    // 选择标签
    handleTagChange(value) {
        if (value.length > 3) {
            message.error('标签数量不能超过3个！');
            value.pop();
        } else {
            this.setState({
                selectedTag: value
            });
        }
    }

    render() {
        const { note, visible, confirmLoading, taglist } = this.state;
        const { bookname, title } = note;
        const { match } = this.props;
        const suffixTitle = title ? <Icon type="close-circle" onClick={this.emitEmptyTitle} /> : null;
        const suffixBook = bookname ? <Icon type="close-circle" onClick={this.emitEmptyBook} /> : null;
        return (
            <div className="edit-container">
                <div className="edit-header">
                    <Icon type="form" className="edit-header-icon" />
                    <h2 className="edit-header-text">创建笔记</h2>
                </div>
                <div className="edit-line">
                    <span className="edit-line-intro">笔记标题</span>
                    <Input
                        placeholder="笔记标题"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={suffixTitle}
                        value={title}
                        onChange={(e) => { this.onChangeValue(e, 'title'); }}
                        ref={node => { this.titleInput = node; }} />
                </div>
                <div className="edit-line">
                    <span className="edit-line-intro">相关书籍</span>
                    <Input
                        placeholder="相关书籍"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={suffixBook}
                        value={bookname}
                        onChange={(e) => { this.onChangeValue(e, 'bookname'); }}
                        ref={node => { this.bookInput = node; }} />
                </div>
                <div className="edit-block">
                    <h3 className="edit-line-intro">摘录内容</h3>
                    <div ref="editorContent" className="edit-editor" />
                </div>
                <div className="edit-block">
                    <h3 className="edit-line-intro">你的心得</h3>
                    <div ref="editorIdea" className="edit-editor" />
                </div>
                <div className="edit-action">
                    {match.params.type === 'box'
                        ? <Button className="edit-button" onClick={this.submitNote}>暂存</Button> : null}
                    <Button className="edit-button"
                        onClick={match.params.type === 'box' ? this.showModal : this.submitNote}>
                        发表
                    </Button>
                </div>
                <Modal
                    title="请选择标签(至多三个)"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    zIndex={1000}>
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="请选择标签"
                        onChange={this.handleTagChange}>
                        {taglist.length > 0
                            ? taglist.map((item) => (
                                <Option value={item.tagid + ''} key={item.tagid}>
                                    {item.tagname}
                                </Option>
                            ))
                            : null}
                    </Select>
                </Modal>
            </div>
        );
    }
}

export default BoxNote;
