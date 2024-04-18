import http from '@/request/http';
//  -------  此处为举例  --------
/** 获取列表 */
export const getCardList = () => {
  return http.get('/api/pageList', {});
};

/** 新增类型 - 带文件 */
export const createCardCategory = (params) => {
  return http.post('/api/save', params, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
  });
};
/** 删除卡片分类 */
export const delCardCategory = (id) => {
  return http.delete(`/api/delete?id=${id}`);
};
