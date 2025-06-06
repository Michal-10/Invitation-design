﻿using Microsoft.EntityFrameworkCore;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Data.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
             return await _dataContext.Users.Include(u => u.Roles).ToListAsync();
        }
        public async Task<List<string>> GetEmailUsersAsync()
        {
            return await _dataContext.Users
                .Select(u => u.Email)
                .ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _dataContext.Users.Include(u=>u.Roles).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<bool> AddUserAsync(User user)
        {
            await _dataContext.Users.AddAsync(user);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<User> UpdateUserAsync(int id, User user)
        {
            var userEntity = await GetUserByIdAsync(id);
            if (userEntity == null)
                return null;

            userEntity.FirstName = user.FirstName;

            userEntity.LastName = user.LastName;

            userEntity.Email = user.Email;

            userEntity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            userEntity.Roles = userEntity.Roles;

            _dataContext.Users.Update(userEntity);
            await _dataContext.SaveChangesAsync() ;
            return userEntity;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await GetUserByIdAsync(id);
           
            if (user == null)
            {
                return false; 
            }

            _dataContext.Users.Remove(user);
            return await _dataContext.SaveChangesAsync() > 0; 
        }

    }
}
