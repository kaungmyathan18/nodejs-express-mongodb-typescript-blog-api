import NotFoundException from '@exceptions/notFound.exception';
import { ResourceConflictException } from '@exceptions/ResourceConflictException';
import { checkForInvalidIdException, translateMessage } from '@utils/functions';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserModel } from './models/user.model';

export class UserService {
  private userRepository = UserModel;
  constructor() {
    this.bindMethods();
  }
  private bindMethods() {
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getUsers({ page, rowsPerPage, filter }: any) {
    try {
      const totalItems = await this.userRepository.find(filter).count();
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      const users = await this.userRepository
        .find(filter)
        .select('-password')
        .skip((page - 1) * rowsPerPage)
        .limit(rowsPerPage);
      return {
        pagination: {
          count: users.length,
          currentPage: page,
          nextPage: page + 1 > totalPages ? null : page + 1,
          totalItems,
          totalPages,
          rowsPerPage,
        },
        items: users,
        message: translateMessage('Success'),
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findById(id).select('-password');
      if (!user) {
        throw new NotFoundException(
          translateMessage('User with given id not found.'),
        );
      }
      return user;
    } catch (error) {
      checkForInvalidIdException(error);
    }
  }

  async createUser(payload: CreateUserDTO) {
    try {
      return await this.userRepository.create(payload);
    } catch (error) {
      if (error.code === 11000) {
        throw new ResourceConflictException(
          translateMessage('User with this name already exists'),
        );
      }
      throw error;
    }
  }

  async updateUser(id: string, payload: UpdateUserDTO) {
    try {
      const result = await this.userRepository.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
          projection: {
            password: 0,
          },
        },
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const result = await this.userRepository.findByIdAndDelete(id);
      if (!result) {
        throw new NotFoundException(
          translateMessage('User with given id not found.'),
        );
      }
      return {
        message: translateMessage('Successfully deleted the user.'),
      };
    } catch (error) {
      checkForInvalidIdException(error);
    }
  }
}
