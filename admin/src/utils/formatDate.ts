export const formatDate = (dateString: string): string => {
  const dayjs = useDayjs();

  const date = dayjs(dateString);
  const formatted = date.format("YYYY-MM-DD HH:mm:ss");
  return formatted;
};

export const dateforFilter = (date: number): string => {
  const dayjs = useDayjs();
  return dayjs(date).toISOString();
};
