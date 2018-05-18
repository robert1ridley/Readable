export const capitalizeFirstLetter = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export const generateUid = () => {
  function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

export const calculateCommentCount = (postId, originalCommentCount, updatesList) => {
  if(updatesList.length === 0){
    return originalCommentCount
  }
  const foundIndex = updatesList.findIndex(i => i.postId === postId)
  if(foundIndex === -1){
    return originalCommentCount
  }
  else {
    return originalCommentCount + updatesList[foundIndex].countIncrease
  }
}