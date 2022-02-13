<?php


namespace app\admin\controller\mall;


use app\admin\model\MallGoods;
use app\admin\traits\Curd;
use app\common\controller\AdminController;
use EasyAdmin\annotation\ControllerAnnotation;
use EasyAdmin\annotation\NodeAnotation;
use think\App;

/**
 * Class Goods
 * @package app\admin\controller\mall
 * @ControllerAnnotation(title="商城商品管理")
 */
class Goods extends AdminController
{

    use Curd;//打破单继承，用trait,多个类可以使用，用use+trait名

    protected $relationSearch = true;

    public function __construct(App $app)
    {
        parent::__construct($app);//父类的构造方法
        $this->model = new MallGoods();//需要实例化MallGoods类，必须use app\admin\model\MallGoods;
    }

    /**
     * @NodeAnotation(title="列表")
     */
    public function index()
    {
        //$this->request->isAjax()判断是否AJAX请求
        if ($this->request->isAjax()) {
            //input(): 获取输入数据 支持默认值和过滤
            /**
             * 获取输入数据 支持默认值和过滤
             * @param string $key     获取的变量名
             * @param mixed  $default 默认值
             * @param string $filter  过滤方法
             * @return mixed
             */
            //input(string $key = '', $default = null, $filter = '')
            if (input('selectFields')) {
                return $this->selectList();
            }
            //list() 函数用于在一次操作中给一组变量赋值。该函数只用于数字索引的数组。
            list($page, $limit, $where) = $this->buildTableParames();

            $count = $this->model
                ->withJoin('cate', 'LEFT') //左链接
                ->where($where)
                ->count();
            $list = $this->model
                ->withJoin('cate', 'LEFT')
                ->where($where)
                ->page($page, $limit)
                ->order($this->sort)
                ->select();
            $data = [
                'code'  => 0,
                'msg'   => '',
                'count' => $count,
                'data'  => $list,
            ];
            return json($data);
        }

        return $this->fetch();//模板渲染
    }

    /**
     * @NodeAnotation(title="入库")
     */
    public function stock($id)
    {
        $row = $this->model->find($id);
        empty($row) && $this->error('数据不存在');
        if ($this->request->isPost()) {
            $post = $this->request->post();
            $rule = [];
            $this->validate($post, $rule);
            try {
                $post['total_stock'] = $row->total_stock + $post['stock'];
                $post['stock'] = $row->stock + $post['stock'];
                $save = $row->save($post);
            } catch (\Exception $e) {
                $this->error('保存失败');
            }
            $save ? $this->success('保存成功') : $this->error('保存失败');
        }
        $this->assign('row', $row);
        return $this->fetch();
    }

}