/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import E from 'wangeditor';
import xss from 'xss';
import {
    Icon, Button, Input, Modal, message, Select
} from 'antd';
import myFetch from '../../utils/myFetch';
import './index.scss';

const { Option } = Select;

class EditNote extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            bookname: '',
            title: '',
            visible: false,
            confirmLoading: false,
            taglist: [],
            selectedTag: []
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.submitBox = this.submitBox.bind(this);
        this.submitNote = this.submitNote.bind(this);
        this.submitNoteTag = this.submitNoteTag.bind(this);
        this.onChangeBookname = this.onChangeBookname.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
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

    // 绑定标题
    onChangeTitle(e) {
        const val = e.target.value;
        this.setState({
            title: val
        });
    }

    onChangeBookname(e) {
        const val = e.target.value;
        this.setState({
            bookname: val
        });
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    // 提交笔记的标签
    submitNoteTag(noteid) {
        let that = this;
        const { selectedTag } = this.state;
        let tag = {
            noteid,
            tagid: selectedTag
        };
        myFetch.POST('note/notetag', tag)
            .then((response) => {
                if (response.code === '0') {
                    message.success('发表成功！');

                    window.location.href = '/#/detail/' + noteid;
                } else {
                    message.error(response.msg);
                }
                that.setState({
                    visible: false,
                    confirmLoading: false
                });
            });
    }

    // 发表新笔记
    submitNote() {
        let that = this;

        const { bookname, title } = this.state;
        if (!title || title.length === 0) {
            message.error('标题不能为空！');
        }
        let data = {
            bookName: xss(bookname),
            content: xss(this.eContent.txt.html()),
            idea: xss(this.eIdea.txt.html()),
            title: xss(title),
            publishTime: (new Date()).getTime()
        };
        myFetch.POST('note/newnote', data)
            .then((response) => {
                if (response.code === '0') {
                    const { noteid } = response.data;
                    that.submitNoteTag(noteid);
                } else {
                    message.error(response.msg);
                }
            });
    }

    // 暂存
    submitBox() {
        const { bookname, title } = this.state;
        if (!title || title.length === 0) {
            message.error('标题不能为空！');
        }
        let data = {
            bookName: xss(bookname),
            content: xss(this.eContent.txt.html()),
            idea: xss(this.eIdea.txt.html()),
            title: xss(title)
        };
        myFetch.POST('note/newnote', data)
            .then((response) => {
                if (response.code === '0') {
                    message.success('存储成功！');
                    window.location.href = '/#/personal';
                } else {
                    message.error(response.msg);
                }
            });
    }

    // 模态框OK按钮
    handleOk() {
        this.setState({
            confirmLoading: true
        });
        const { selectedTag } = this.state;
        if (selectedTag.length === 0) {
            message.error('请至少选择一个标签！');
            this.setState({
                confirmLoading: false
            });
            return;
        }
        if (selectedTag.length > 3) {
            message.error('标签数量不能超过3个！');
            this.setState({
                confirmLoading: false
            });
            return;
        }
        this.submitNote();
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
        const { title, bookname, visible, confirmLoading, taglist } = this.state;
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
                        onChange={this.onChangeTitle}
                        ref={node => { this.titleInput = node; }} />
                </div>
                <div className="edit-line">
                    <span className="edit-line-intro">相关书籍</span>
                    <Input
                        placeholder="相关书籍"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={suffixBook}
                        value={bookname}
                        onChange={this.onChangeBookname}
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
                    <Button className="edit-button" onClick={this.submitBox}>暂存</Button>
                    <Button className="edit-button"
                        onClick={this.showModal}>
                        发表
                    </Button>
                </div>
                <Modal
                    title="请选择标签(至多三个)"
                    visible={visible}
                    okText="确认发表"
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

export default EditNote;
