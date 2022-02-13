define(["jquery", "easy-admin"], function ($, ea) {

    //init初始化配置
    var init = {
        table_elem: '#currentTable', //table容器或者dom必填
        table_render_id: 'currentTableRenderId',//容器唯一 id 必填
        index_url: 'mall.goods/index',//列表接口
        add_url: 'mall.goods/add',//添加接口
        edit_url: 'mall.goods/edit',//编辑接口
        delete_url: 'mall.goods/delete',//删除接口
        export_url: 'mall.goods/export',//导出接口
        modify_url: 'mall.goods/modify',//属性修改接口
        stock_url: 'mall.goods/stock',//入库接口
    };

    var Controller = {
        index: function () {
            //表格实例化方法为ea.table.render(), 兼容layui table的所有功能，另外还扩展了一些新的功能
            ea.table.render({
                init: init,//一般情况下，请传入上方配置好的初始化参数
                //toolbar内置三个内置权限验证：add,delete,export
                toolbar: ['refresh',
                    [{
                        text: '添加',//文本信息
                        url: init.add_url,//请求链接
                        method: 'open',//执行方式method 执行方式： open 弹出层打开 request 直接请求 none 需要配合extend自定义参数内
                        auth: 'add',//权限规则，具体请参考配置auth权限验证模块
                        class: 'layui-btn layui-btn-normal layui-btn-sm',//样式信息
                        icon: 'fa fa-plus ',//图标信息
                        extend: 'data-full="true"',//扩展属性例如弹出层全屏操作，可以加上：data-full="true
                    }],
                    'delete', 'export'],
                cols: [[
                    {type: "checkbox"},
                    {field: 'id', width: 80, title: 'ID'},
                    {field: 'sort', width: 80, title: '排序', edit: 'text'},
                    {field: 'cate.title', minWidth: 80, title: '商品分类'},
                    {field: 'title', minWidth: 80, title: '商品名称'},
                    {field: 'logo', minWidth: 80, title: '分类图片', search: false, templet: ea.table.image},
                    {field: 'market_price', width: 100, title: '市场价', templet: ea.table.price},
                    {field: 'discount_price', width: 100, title: '折扣价', templet: ea.table.price},
                    {field: 'total_stock', width: 100, title: '库存统计'},
                    {field: 'stock', width: 100, title: '剩余库存'},
                    {field: 'virtual_sales', width: 100, title: '虚拟销量'},
                    {field: 'sales', width: 80, title: '销量'},
                    {field: 'status', title: '状态', width: 85, selectList: {0: '禁用', 1: '启用'}, templet: ea.table.switch},
                    {field: 'create_time', minWidth: 80, title: '创建时间', search: 'range'},
                    {
                        width: 250,
                        title: '操作',
                        templet: ea.table.tool,/*列操作栏	自动生成列操作栏*/
                        //operat内置三个内置权限验证：edit,delete
                        operat: [
                            [{
                                text: '编辑',
                                url: init.edit_url,
                                method: 'open',
                                auth: 'edit',
                                class: 'layui-btn layui-btn-xs layui-btn-success',
                                extend: 'data-full="true"',
                            }, {
                                text: '入库',
                                url: init.stock_url,
                                method: 'open',
                                auth: 'stock',
                                class: 'layui-btn layui-btn-xs layui-btn-normal',
                            }],
                            'delete']
                    }
                ]],
            });
            //事件监听方法：ea.listen(preposeCallback, ok, no, ex)，可能用得比较多的还是preposeCallback的提交前置回调。
            ea.listen();
        },
        add: function () {
            ea.listen();
        },
        edit: function () {
            ea.listen();
        },
        stock: function () {
            ea.listen();
        },
    };
    return Controller;
});