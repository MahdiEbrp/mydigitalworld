import Checkbox from './Checkbox';
import ImageLoader from './ImageLoader';
import Input from './Input';
import NothingToSee from './display/NothingToSee';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CommentType } from '@/type/comment';
import { TextLimitByLength } from './TextLimit';
import { getTimeSinceDate } from '../lib/dateUtility';

type CommentListProps = {
  commentList: CommentType[];
  filterSelectedId: string;
  onSelectionChange?: (id: string) => void;
  checkedIds: string[];
};
type CommentItemProps = {
  comment: CommentType;
  defaultChecked: boolean;
  onCheck: (id: string) => void;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, defaultChecked, onCheck }) => {
  return (
    <li key={comment.id} className='bg-primary-400 p-2 flex break-all items-start space-x-2'>
      <div className='flex flex-row items-center gap-1 flex-wrap'>
        <Checkbox label='' defaultChecked={defaultChecked} onClick={() => onCheck(comment.id)} />
        {comment.image &&
          <ImageLoader src={comment.image} width={32} height={32} alt={comment.userName || 'unknown'} className='rounded-full' />
        }
      </div>
      <div className='flex flex-col items-start gap-1 flex-1'>
        <p>{`${comment.userName ? comment.userName + ' ' : ''}${getTimeSinceDate(comment.createdAt)} said: ${comment.opinion}`}</p>
        <TextLimitByLength maxLength={25}>{`Comment: ${comment.opinion}`}</TextLimitByLength>
      </div>
    </li>
  );
};

const CommentList = ({ commentList, filterSelectedId, onSelectionChange, checkedIds: checkedItems }: CommentListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState(commentList);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    setComments(commentList);
  }, [commentList]);

  const handleSelectionChange = (id: string) => {
    onSelectionChange?.(id);
  };
  const filteredComments = comments.filter(
    (comment) =>
      comment.opinion.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterSelectedId === '' ? true : comment.topicId === filterSelectedId)
  );

  return (
    <div className='container mx-auto px-4'>
      <div className='flex items-center my-4 border border-primaryBackground-100 rounded overflow-hidden'>
        <Input type='text' placeholder='Search comments' value={searchQuery} onChange={handleSearchChange} />
        <AiOutlineSearch className='text-gray-500' />
      </div>

      {filteredComments.length === 0 ?
        <NothingToSee />
        :
        <ul className='overflow-hidden shadow rounded'>
          {filteredComments.map((comment) =>
            <CommentItem
              key={comment.id}
              comment={comment}
              defaultChecked={checkedItems.includes(comment.id)}
              onCheck={handleSelectionChange}
            />
          )}
        </ul>
      }
    </div>
  );
};

export default CommentList;
