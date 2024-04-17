export const usePagination = (
  onUpdatePageSize: () => void,
  defaultPageSize = 5,
) => {
  const pagination = reactive({
    page: 1,
    pageCount: 1,
    pageSize: defaultPageSize,
    itemCount: 1000
    
    // onChange: (page: number) => {
    //   pagination.page = page;
    // },
    // onUpdatePageSize: (pageSize: number) => {
    //   pagination.pageSize = pageSize;
    //   pagination.page = 1;

    //   onUpdatePageSize();
    // },
  });

  return pagination;
};
